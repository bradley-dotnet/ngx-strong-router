import { EnvironmentProviders, Provider, Type } from '@angular/core';
import { Route, Routes } from '@angular/router';
import { LazyChild } from './strong-route.model';

type EntryFields = Pick<Route, 'component' | 'providers'| 'canActivate' | 'canActivateChild' | 'resolve' | 'canLoad' | 'canDeactivate' | 'data'>;

export type RouteEntry = EntryFields | Type<any> | Array<Provider | EnvironmentProviders>;

export const populateRoutes:  <TEntries extends number>(map: Record<TEntries, RouteEntry>, routes: LazyChild<unknown, TEntries>[]) => Routes = 
    <TEntries extends number>(
    map: Record<TEntries, RouteEntry>,
    routes: LazyChild<unknown, TEntries>[]) => {
    return routes.map(r => {
        let update: Partial<Route> = {}
        if (r.routeEntry != null) {
            const entry = map[r.routeEntry]
            if (typeof entry === 'function') {
                update = {
                    component: entry
                };
            } else if (Array.isArray(entry)) {
                update = {
                    providers: entry
                }
            }
            else {
                update = {
                    ...entry,
                    data: r.data ? { ...r.data, ...entry.data }: entry.data
                }
            }
        }

        if (r.children) {
            update = {
                ...update,
                children: populateRoutes(map, r.children)
            }
        }
        const {routeEntry, ...updated} = {
            ...r,
            ...update
        };
        return updated;
    });
}
