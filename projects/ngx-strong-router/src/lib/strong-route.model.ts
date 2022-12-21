import { LoadChildren, Route } from "@angular/router";

export interface EagerRoute<TNavTargets> extends Omit<Route, 'loadChildren'> {
    loadChildren?: never;
    children?: EagerRoute<TNavTargets>[],
    navigationTarget?: TNavTargets;
}

export interface LazyRoute<TNavTargets, TComponent extends number> extends Omit<Route, 'component' | 'children' | 'loadChildren'> {
    loadChildren: LoadChildren;
    childRouteConfigs: (LazyChild<TNavTargets, TComponent> | LazyRoute<TNavTargets, number>)[];
    navigationTarget?: TNavTargets;
}

export interface LazyChild<TNavTargets, TComponent extends number> extends Omit<EagerRoute<TNavTargets>, 'component' | 'providers' | 'children'> {
    routeEntry?: TComponent;
    children?: LazyChild<TNavTargets, TComponent>[];
}

export type StrongRoute<TNavTargets> = EagerRoute<TNavTargets> | LazyRoute<TNavTargets, number>;
