import { LazyChild } from 'ngx-strong-router';
import { NavigationTargets } from '../navigation-targets.enum';

export enum SetupRouteEntries {
    Root
}

export const setupRoutes: LazyChild<NavigationTargets, SetupRouteEntries>[] = [
    {
        path: '',
        routeEntry: SetupRouteEntries.Root,
        children: [
            
        ]
    }
]