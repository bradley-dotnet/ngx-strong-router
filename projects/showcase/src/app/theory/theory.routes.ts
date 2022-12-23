import { LazyChild } from 'ngx-strong-router';
import { NavigationTargets } from '../navigation-targets.enum';

export enum TheoryRouteEntries {
    Root,
    MagicUrls,
    RefactoringMishaps,
    NamedRoutes,
    StrongRoutes
}

export const theoryRoutes: LazyChild<NavigationTargets, TheoryRouteEntries>[] = [
    {
        path: '',
        routeEntry: TheoryRouteEntries.Root,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'magic-urls'
            },
            {
                path: 'magic-urls',
                routeEntry: TheoryRouteEntries.MagicUrls,
                navigationTarget: NavigationTargets.TheoryMagicUrls
            },
            {
                path: 'refactoring-mishaps',
                routeEntry: TheoryRouteEntries.RefactoringMishaps,
                navigationTarget: NavigationTargets.TheoryRefactoringMishaps
            },
            {
                path: 'named-routes',
                routeEntry: TheoryRouteEntries.NamedRoutes,
                navigationTarget: NavigationTargets.TheoryNamedRoutes
            },
            {
                path: 'strong-routes',
                routeEntry: TheoryRouteEntries.StrongRoutes,
                navigationTarget: NavigationTargets.TheoryStrongRoutes
            }
        ]
    }
]