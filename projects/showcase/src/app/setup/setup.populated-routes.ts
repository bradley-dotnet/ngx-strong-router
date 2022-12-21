import { Routes } from '@angular/router';
import { populateRoutes, RouteEntry } from 'ngx-strong-router';
import { SetupRouteEntries, setupRoutes } from './setup.routes';

const componentMap: Record<SetupRouteEntries, RouteEntry> = {
};

export const populatedSetupRoutes: Routes = populateRoutes(componentMap, setupRoutes);