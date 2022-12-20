import { LocationStrategy } from '@angular/common';
import { Attribute, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StrongRouter } from './strong-router.service';

@Directive({
  selector: '[ngxStrongRouterLink]',
  standalone: true
})
// Follow the router link directive naming scheme for ease of import
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class StrongRouterLink<TNavTargets> extends RouterLink implements OnChanges {
  @Input() public ngxStrongRouterLink: TNavTargets | undefined;
  
  constructor(
    private readonly strongRouter: StrongRouter<TNavTargets>,
    router: Router,
    route: ActivatedRoute,
    @Attribute('tabindex') tabIndexAttribute: string|null|undefined,
    renderer: Renderer2,
    el: ElementRef,
    locationStrategy?: LocationStrategy) {
    super(router, route, tabIndexAttribute, renderer, el, locationStrategy);
  }

  override ngOnChanges(changes: SimpleChanges): void {
    if (changes['ngxStrongRouterLink']) {
      const url = this.strongRouter.generateLinkTo(changes['ngxStrongRouterLink'].currentValue);
      this.routerLink = url;
    }
    super.ngOnChanges(changes);
  }
}
