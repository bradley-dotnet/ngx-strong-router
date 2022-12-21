import { LazyChild } from 'ngx-strong-router';
import { NavigationTargets } from '../navigation-targets.enum';

export enum TheoryRouteEntries {
    Root
}

export const theoryRoutes: LazyChild<NavigationTargets, TheoryRouteEntries>[] = [
    {
        path: '',
        routeEntry: TheoryRouteEntries.Root,
        children: [
            
        ]
    }
]