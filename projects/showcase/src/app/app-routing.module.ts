import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StrongRoute } from 'ngx-strong-router';
import { HomeComponent } from './home/home.component';
import { NavigationTargets } from './navigation-targets.enum';
import { setupRoutes } from './setup/setup.routes';
import { theoryRoutes } from './theory/theory.routes';

const routes: StrongRoute<NavigationTargets>[] = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    navigationTarget: NavigationTargets.Home
  },
  // Test lazy loaded standalone routes
  {
    path: 'setup',
    loadChildren: () => import('./setup/setup.populated-routes').then(r => r.populatedSetupRoutes),
    childRouteConfigs: setupRoutes,
    navigationTarget: NavigationTargets.SetupHome
  },
  // Test lazy loaded routing module
  {
    path: 'theory',
    loadChildren: () => import('./theory/theory.module').then(m => m.TheoryModule),
    childRouteConfigs: theoryRoutes,
    navigationTarget: NavigationTargets.TheoryHome
  },
  // Ensure lazy component still works
  {
    path: 'api',
    loadComponent: () => import('./api/api.component').then(c => c.ApiComponent),
    navigationTarget: NavigationTargets.Api
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
