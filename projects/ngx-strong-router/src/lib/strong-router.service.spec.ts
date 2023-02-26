import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { RouteTreeTraverserService } from './route-tree-traverser.service';
import { StrongRoute } from './strong-route.model';

import { StrongRouter } from './strong-router.service';

enum TestTargets {
  Test,
  NonExistent
}

describe('StrongRouter', () => {
  const currentRoute = {
    routeConfig: {
      children: []
    }
  } as unknown as ActivatedRouteSnapshot;
  let treeTraverserSpy: jasmine.SpyObj<RouteTreeTraverserService<TestTargets>>;
  let routerSpy: jasmine.SpyObj<Router>;
  let service: StrongRouter<TestTargets>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj<Router>('routerSpy', ['navigate', 'navigateByUrl']);
    treeTraverserSpy = jasmine.createSpyObj<RouteTreeTraverserService<TestTargets>>('traverserSpy', ['mapTargets', 'createUrlTreeFromSnapshot']);

    treeTraverserSpy.mapTargets.and.returnValue(new Map([
      [TestTargets.Test, ['test', ':id']]
    ]));

    service = new StrongRouter(routerSpy, treeTraverserSpy);
  });

  describe('navigateTo', () => {
    it('navigates with proper parameters', () => {
      const extras = { replaceUrl: true };
      service.navigateTo(TestTargets.Test, { id: 1 }, extras);

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/', 'test', '1'], extras);
    });

    it('throws when route parameter missing', () => {
      expect(() => service.navigateTo(TestTargets.Test)).toThrowError('Required route parameter id was not found in route params object');
    });

    it('throws when non-existing target passed', () => {
      expect(() => service.navigateTo(TestTargets.NonExistent)).toThrowError('Could not find navigation target 1 anywhere in route config');
    });
  });

  describe('generateLinkTo', () => {
    it('generates link with proper parameters', () => {
      const link = service.generateLinkTo(TestTargets.Test, { id: 2 });
      expect(link).toBe('/test/2');
    });

    it('throws when route parameter missing', () => {
      expect(() => service.generateLinkTo(TestTargets.Test, { name: 'bob' })).toThrowError('Required route parameter id was not found in route params object');
    });

    it('throws when non-existing target passed', () => {
      expect(() => service.generateLinkTo(TestTargets.NonExistent)).toThrowError('Could not find navigation target 1 anywhere in route config');
    });
  });

  describe('navigateRelativeTo', () => {
    beforeEach(() => {
      treeTraverserSpy.mapTargets.calls.reset();
      treeTraverserSpy.mapTargets.and.returnValue(new Map([
        [TestTargets.Test, ['relative', ':name']]
      ]));
    });

    it('navigates with proper parameters', () => {
      const extras = { replaceUrl: true };
      // We're just calling toString on the UrlTree, which string also defines
      treeTraverserSpy.createUrlTreeFromSnapshot.and.returnValue('/relative/bob' as unknown as UrlTree);
      service.navigateRelativeTo(TestTargets.Test, currentRoute, { name: 'bob' }, extras);

      const children: StrongRoute<TestTargets>[] = currentRoute!.routeConfig!.children as StrongRoute<TestTargets>[];
      expect(treeTraverserSpy.createUrlTreeFromSnapshot).toHaveBeenCalledWith(currentRoute, ['./', 'relative', 'bob'])
      expect(treeTraverserSpy.mapTargets).toHaveBeenCalledWith(children);
      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/relative/bob', extras);
    });

    it('throws when route parameter missing', () => {
      expect(() => service.navigateRelativeTo(TestTargets.Test, currentRoute, { id: 1 }))
        .toThrowError('Required route parameter name was not found in route params object');

      const children: StrongRoute<TestTargets>[] = currentRoute!.routeConfig!.children as StrongRoute<TestTargets>[];
      expect(treeTraverserSpy.mapTargets).toHaveBeenCalledWith(children);
    });

    it('throws when non-existing target passed', () => {
      treeTraverserSpy.mapTargets.and.returnValue(new Map([
        [TestTargets.NonExistent, ['relative', ':name']]
      ]));
      expect(() => service.navigateRelativeTo(TestTargets.Test, currentRoute))
        .toThrowError('Could not find navigation target 0 anywhere in route config');

      const children: StrongRoute<TestTargets>[] = currentRoute!.routeConfig!.children as StrongRoute<TestTargets>[];
      expect(treeTraverserSpy.mapTargets).toHaveBeenCalledWith(children);
    });
  });

  describe('generateLinkRelativeTo', () => {
    beforeEach(() => {
      treeTraverserSpy.mapTargets.calls.reset();
      treeTraverserSpy.mapTargets.and.returnValue(new Map([
        [TestTargets.Test, ['relative', ':name']]
      ]));
    });

    it('generates link with proper parameters', () => {
      // We're just calling toString on the UrlTree, which string also defines
      treeTraverserSpy.createUrlTreeFromSnapshot.and.returnValue('/relative/bob' as unknown as UrlTree);
      const link = service.generateLinkRelativeTo(TestTargets.Test, currentRoute, { name: 'bob' });

      const children: StrongRoute<TestTargets>[] = currentRoute!.routeConfig!.children as StrongRoute<TestTargets>[];
      expect(treeTraverserSpy.createUrlTreeFromSnapshot).toHaveBeenCalledWith(currentRoute, ['./', 'relative', 'bob'])
      expect(treeTraverserSpy.mapTargets).toHaveBeenCalledWith(children);
      expect(link).toEqual('/relative/bob');
    });

    it('throws when route parameter missing', () => {
      expect(() => service.generateLinkRelativeTo(TestTargets.Test, currentRoute, { id: 1 }))
        .toThrowError('Required route parameter name was not found in route params object');

      const children: StrongRoute<TestTargets>[] = currentRoute!.routeConfig!.children as StrongRoute<TestTargets>[];
      expect(treeTraverserSpy.mapTargets).toHaveBeenCalledWith(children);
    });

    it('throws when non-existing target passed', () => {
      treeTraverserSpy.mapTargets.and.returnValue(new Map([
        [TestTargets.NonExistent, ['relative', ':name']]
      ]));
      expect(() => service.generateLinkRelativeTo(TestTargets.Test, currentRoute))
        .toThrowError('Could not find navigation target 0 anywhere in route config');

      const children: StrongRoute<TestTargets>[] = currentRoute!.routeConfig!.children as StrongRoute<TestTargets>[];
      expect(treeTraverserSpy.mapTargets).toHaveBeenCalledWith(children);
    });
  });
});
