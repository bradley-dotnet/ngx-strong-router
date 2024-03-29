import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationExtras, Router } from '@angular/router';
import { StrongRoute } from './strong-route.model';
import { RouteTreeTraverserService } from './route-tree-traverser.service';

@Injectable({
  providedIn: 'root'
})
export class StrongRouter<TNavTargets> {
  private targetCache: Map<TNavTargets, string[]>;

  constructor(private readonly router: Router,
    private readonly treeTraverser: RouteTreeTraverserService<TNavTargets>) {
    // Cast the routes; we have to assume they are strong routes
    this.targetCache = this.treeTraverser.mapTargets(router.config as StrongRoute<TNavTargets>[]);
  }

  public navigateTo(target: TNavTargets, params?: Record<string, string | number>, extras?: NavigationExtras): void {
    const segments = this.findSegments(target);
    const route = this.createFullRoute(segments, params);

    this.router.navigate(['/', ...route], extras);
  }

  public generateLinkTo(target: TNavTargets, params?: Record<string, string | number>): string {
    const segments = this.findSegments(target);
    const route = this.createFullRoute(segments, params);

    return `/${route.join('/')}`;
  }

  public navigateRelativeTo(target: TNavTargets, current: ActivatedRouteSnapshot, params?: Record<string, string | number>, extras?: NavigationExtras): void {
    if (current.routeConfig?.children) {
      const relativeTargets = this.treeTraverser.mapTargets(current.routeConfig.children as StrongRoute<TNavTargets>[]);
      const segments = this.findSegments(target, relativeTargets);
      const route = this.createFullRoute(segments, params);
      const urlTree = this.treeTraverser.createUrlTreeFromSnapshot(current, ['./', ...route]);
  
      this.router.navigateByUrl(urlTree, extras);
    }
    else {
      throw new Error('No child routes available')
    }
  }

  public generateLinkRelativeTo(target: TNavTargets, current: ActivatedRouteSnapshot, params?: Record<string, string | number>): string {
    if (current.routeConfig?.children) {
      const relativeTargets = this.treeTraverser.mapTargets(current.routeConfig.children as StrongRoute<TNavTargets>[]);
      const segments = this.findSegments(target, relativeTargets);
      const route = this.createFullRoute(segments, params);
      const urlTree = this.treeTraverser.createUrlTreeFromSnapshot(current, ['./', ...route]);

      return urlTree.toString();
    }
    else {
      throw new Error('No child routes available')
    }
  }

  private findSegments(target: TNavTargets, cache?: Map<TNavTargets, string[]>): string[] {
    const targetMap = cache ?? this.targetCache;
    const result = targetMap.get(target);
    if (result) {
      return result;
    }
    else {
      throw new Error(`Could not find navigation target ${target} anywhere in route config`);
    }
  }

  private createFullRoute(segments: string[], params?: Record<string, string | number>): string[] {
    return segments.map(s => {
      if (s.startsWith(':')) {
        const paramName = s.slice(1);
        const paramValue = params?.[paramName];
        if (paramValue != null) {
          return typeof paramValue === 'string' ? paramValue : paramValue.toString();
        }
        else {
          throw new Error(`Required route parameter ${paramName} was not found in route params object`);
        }
      } else {
        return s;
      }
    })
  }
}
