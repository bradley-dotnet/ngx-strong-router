import { Routes } from '@angular/router';
import { populateRoutes, RouteEntry } from 'ngx-strong-router';
import { BasicsComponent } from './basics/basics.component';
import { LazyLoadingComponent } from './lazy-loading/lazy-loading.component';
import { NavigatingComponent } from './navigating/navigating.component';
import { SetupRootComponent } from './setup-root/setup-root.component';
import { SetupRouteEntries, setupRoutes } from './setup.routes';

const componentMap: Record<SetupRouteEntries, RouteEntry> = {
    [SetupRouteEntries.Root]: SetupRootComponent,
    [SetupRouteEntries.Basics]: BasicsComponent,
    [SetupRouteEntries.LazyLoading]: LazyLoadingComponent,
    [SetupRouteEntries.Navigation]: NavigatingComponent
};

export const populatedSetupRoutes: Routes = populateRoutes(componentMap, setupRoutes);