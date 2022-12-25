import { LazyChild } from 'ngx-strong-router';
import { NavigationTargets } from '../navigation-targets.enum';

export enum SetupRouteEntries {
    Root,
    Basics,
    LazyLoading,
    Navigation
}

export const setupRoutes: LazyChild<NavigationTargets, SetupRouteEntries>[] = [
    {
        path: '',
        routeEntry: SetupRouteEntries.Root,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'basics'
            },
            {
                path: 'basics',
                routeEntry: SetupRouteEntries.Basics,
                navigationTarget: NavigationTargets.SetupBasics
            },
            {
                path: 'lazy-loading',
                routeEntry: SetupRouteEntries.LazyLoading,
                navigationTarget:NavigationTargets.SetupLazyLoading
            },
            {
                path: 'navigation',
                routeEntry: SetupRouteEntries.Navigation,
                navigationTarget: NavigationTargets.SetupNavigation
            }
        ]
    }
];