import { MockLocationStrategy } from '@angular/common/testing';
import { ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
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

  beforeEach(() => {
      strongRouterSpy = jasmine.createSpyObj<StrongRouter<TestTargets>>('strongRouterSpy', ['generateLinkTo']);
      routerSpy = jasmine.createSpyObj<Router>('', ['createUrlTree', 'serializeUrl'], {
          events: EMPTY
      });
      routerSpy.createUrlTree.and.returnValue({} as UrlTree); // Just needs to be truthy
      routerSpy.serializeUrl.and.returnValue('/test');
      const routeSpy = jasmine.createSpyObj<ActivatedRoute>('', ['toString']);
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
    expect(rendererSpy.setAttribute).toHaveBeenCalledWith(elementSpy.nativeElement, 'href', '/test');
  });
});
