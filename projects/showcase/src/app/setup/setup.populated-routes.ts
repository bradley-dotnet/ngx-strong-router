import { Routes } from '@angular/router';
import { populateRoutes, RouteEntry } from 'ngx-strong-router';
import { SetupRootComponent } from './setup-root/setup-root.component';
import { SetupRouteEntries, setupRoutes } from './setup.routes';

const componentMap: Record<SetupRouteEntries, RouteEntry> = {
    [SetupRouteEntries.Root]: SetupRootComponent
};

export const populatedSetupRoutes: Routes = populateRoutes(componentMap, setupRoutes);