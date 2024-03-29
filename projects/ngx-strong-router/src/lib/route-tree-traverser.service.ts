import { Injectable } from '@angular/core';
import { StrongRoute, EagerRoute, LazyChild, LazyRoute } from './strong-route.model';
import { ActivatedRouteSnapshot, createUrlTreeFromSnapshot, Params, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteTreeTraverserService<TNavTargets> {
  public mapTargets(routes: StrongRoute<TNavTargets>[]): Map<TNavTargets, string[]> {
    return this.createTargetMap(routes, []);
  }

  // Wrapper for the angular global so the router can mock it in tests
  public createUrlTreeFromSnapshot(relativeTo: ActivatedRouteSnapshot, commands: any[], queryParams?: Params | null, fragment?: string | null): UrlTree {
    return createUrlTreeFromSnapshot(relativeTo, commands, queryParams, fragment);
  }

  private createTargetMap(routes: (StrongRoute<TNavTargets> | LazyChild<TNavTargets, number>)[], parents: string[]): Map<TNavTargets, string[]> {
    return routes.reduce((targets, route) => {
      const segments = [...parents];
      if (route.path) {
        segments.push(route.path)
      }
      if (this.isEagerRoute(route)) {
        if (targets.has(route.navigationTarget)) {
          console.warn(`Multiple entries for target ${route.navigationTarget} found`);
        }
        targets.set(route.navigationTarget, segments);
      }
      
      if (this.isLazyRoute(route)) {
        return new Map([
          ...targets.entries(),
          ...this.createTargetMap(route.childRouteConfigs, segments).entries()
        ])
      } else if (route.children) {
        return new Map([
          ...targets.entries(),
          ...this.createTargetMap(route.children, segments).entries()
        ])
      } else {
        return targets;
      }
    }, new Map());
  }

  private isEagerRoute(route: StrongRoute<TNavTargets> | LazyChild<TNavTargets, number>): route is EagerRoute<TNavTargets> {
    return (route as EagerRoute<TNavTargets>).navigationTarget !== undefined;
  }

  private isLazyRoute(route: StrongRoute<TNavTargets> | LazyChild<TNavTargets, number>): route is LazyRoute<TNavTargets, number> {
    return (route as LazyRoute<TNavTargets, number>).childRouteConfigs !== undefined;
  }
}
