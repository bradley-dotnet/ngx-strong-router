import { LocationStrategy } from '@angular/common';
import { Attribute, Directive, ElementRef, forwardRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterLink } from '@angular/router';
import { StrongRouter } from './strong-router.service';

@Directive({
  selector: '[ngxStrongRouterLink]',
  standalone: true,
  providers: [{ provide: RouterLink, useExisting: forwardRef(() => StrongRouterLink)}]
})
// Follow the router link directive naming scheme for ease of import
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class StrongRouterLink<TNavTargets> extends RouterLink implements OnChanges {
  @Input() public ngxStrongRouterLink: TNavTargets | undefined;
  @Input() public routeParams: Record<string, any> | undefined;
  @Input() public navigateRelative: true | false | ActivatedRouteSnapshot | undefined;

  private currentRoute: ActivatedRoute;
  
  constructor(
    private readonly strongRouter: StrongRouter<TNavTargets>,
    router: Router,
    route: ActivatedRoute,
    @Attribute('tabindex') tabIndexAttribute: string|null|undefined,
    renderer: Renderer2,
    el: ElementRef,
    locationStrategy?: LocationStrategy) {
    super(router, route, tabIndexAttribute, renderer, el, locationStrategy);
    this.currentRoute = route; // Because the one in RouterLink is private
  }

  override ngOnChanges(changes: SimpleChanges): void {
    if (changes['ngxStrongRouterLink'] || changes['routeParams'] || changes['navigateRelative']) {
      if(this.ngxStrongRouterLink != null) {
        const relativeTo = typeof this.navigateRelative === 'object' ? this.navigateRelative : this.currentRoute.snapshot;
        const url = this.navigateRelative ?
          this.strongRouter.generateLinkRelativeTo(this.ngxStrongRouterLink, relativeTo, this.routeParams) :
          this.strongRouter.generateLinkTo(this.ngxStrongRouterLink, this.routeParams);
        this.routerLink = url;
      }
    }
    super.ngOnChanges(changes);
  }
}
