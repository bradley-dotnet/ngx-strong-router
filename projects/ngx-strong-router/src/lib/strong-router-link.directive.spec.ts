import { MockLocationStrategy } from '@angular/common/testing';
import { ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router, UrlTree } from '@angular/router';
import { EMPTY } from 'rxjs';
import { StrongRouterLink  } from './strong-router-link.directive';
import { StrongRouter } from './strong-router.service';

enum TestTargets {
  Test
}

describe('StrongRouterLink', () => {
  let rendererSpy: jasmine.SpyObj<Renderer2>;
  let elementSpy: jasmine.SpyObj<ElementRef>;
  let routerSpy: jasmine.SpyObj<Router>;
  let strongRouterSpy: jasmine.SpyObj<StrongRouter<TestTargets>>;
  let directive: StrongRouterLink<TestTargets>;
  let currentRouteSnapshot: ActivatedRouteSnapshot;

  beforeEach(() => {
      strongRouterSpy = jasmine.createSpyObj<StrongRouter<TestTargets>>('strongRouterSpy', ['generateLinkTo', 'generateLinkRelativeTo']);
      routerSpy = jasmine.createSpyObj<Router>('', ['createUrlTree', 'serializeUrl'], {
          events: EMPTY
      });
      routerSpy.createUrlTree.and.returnValue({} as UrlTree); // Just needs to be truthy
      routerSpy.serializeUrl.and.returnValue('/test');
      currentRouteSnapshot = {params: { id: 1} as Params} as ActivatedRouteSnapshot;
      const routeSpy = jasmine.createSpyObj<ActivatedRoute>('', ['toString'], {
        snapshot: currentRouteSnapshot
      });
      rendererSpy = jasmine.createSpyObj<Renderer2>('', ['createElement', 'setAttribute', 'removeAttribute']);
      elementSpy = { nativeElement: { tagName: 'A' } };

      directive = new StrongRouterLink(strongRouterSpy, routerSpy, routeSpy, undefined, rendererSpy, elementSpy,
        new MockLocationStrategy());
  })

  it('sets router link to generated url', () => {
      strongRouterSpy.generateLinkTo.and.returnValue('/test');
      directive.ngxStrongRouterLink = TestTargets.Test;
      directive.ngOnChanges({
        ngxStrongRouterLink: {
          isFirstChange: () => true,
          firstChange: true,
          previousValue: null,
          currentValue: TestTargets.Test
        }
      });

      // Private member of base class, have to index :(
      expect(directive['commands']).toEqual(['/test']);
  });

  it('sets href to generated link', () => {
    strongRouterSpy.generateLinkTo.and.returnValue('/test');
    directive.ngxStrongRouterLink = TestTargets.Test;
    directive.ngOnChanges({
      ngxStrongRouterLink: {
        isFirstChange: () => true,
        firstChange: true,
        previousValue: null,
        currentValue: TestTargets.Test
      }
    });
    expect(strongRouterSpy.generateLinkTo).toHaveBeenCalledWith(TestTargets.Test, undefined);
    expect(rendererSpy.setAttribute).toHaveBeenCalledWith(elementSpy.nativeElement, 'href', '/test');
  });

  it('sets href relative to passed snapshot', () => {
    strongRouterSpy.generateLinkRelativeTo.and.returnValue('/test');
    directive.ngxStrongRouterLink = TestTargets.Test;
    const testSnapshot = {params: { id: 2} as Params} as ActivatedRouteSnapshot;
    directive.navigateRelative = testSnapshot;
    directive.ngOnChanges({
      ngxStrongRouterLink: {
        isFirstChange: () => true,
        firstChange: true,
        previousValue: null,
        currentValue: TestTargets.Test
      }
    });
    expect(strongRouterSpy.generateLinkRelativeTo).toHaveBeenCalledWith(TestTargets.Test, testSnapshot, undefined);
    expect(rendererSpy.setAttribute).toHaveBeenCalledWith(elementSpy.nativeElement, 'href', '/test');
  });

  it('sets href relative to current snapshot', () => {
    strongRouterSpy.generateLinkRelativeTo.and.returnValue('/test');
    directive.ngxStrongRouterLink = TestTargets.Test;
    directive.navigateRelative = true;
    directive.ngOnChanges({
      ngxStrongRouterLink: {
        isFirstChange: () => true,
        firstChange: true,
        previousValue: null,
        currentValue: TestTargets.Test
      }
    });
    expect(strongRouterSpy.generateLinkRelativeTo).toHaveBeenCalledWith(TestTargets.Test, currentRouteSnapshot, undefined);
    expect(rendererSpy.setAttribute).toHaveBeenCalledWith(elementSpy.nativeElement, 'href', '/test');
  });
});
