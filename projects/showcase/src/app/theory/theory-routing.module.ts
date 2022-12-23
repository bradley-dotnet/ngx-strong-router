import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { populateRoutes, RouteEntry } from 'ngx-strong-router';
import { MagicUrlsComponent } from './magic-urls/magic-urls.component';
import { NamedRoutesComponent } from './named-routes/named-routes.component';
import { RefactoringMishapsComponent } from './refactoring-mishaps/refactoring-mishaps.component';
import { StrongRoutesComponent } from './strong-routes/strong-routes.component';
import { TheoryRootComponent } from './theory-root/theory-root.component';
import { TheoryRouteEntries, theoryRoutes } from './theory.routes';

const componentMap: Record<TheoryRouteEntries, RouteEntry> = {
  [TheoryRouteEntries.Root]: TheoryRootComponent,
  [TheoryRouteEntries.MagicUrls]: MagicUrlsComponent,
  [TheoryRouteEntries.RefactoringMishaps]: RefactoringMishapsComponent,
  [TheoryRouteEntries.NamedRoutes]: NamedRoutesComponent,
  [TheoryRouteEntries.StrongRoutes]: StrongRoutesComponent,
};

const routes: Routes = populateRoutes(componentMap, theoryRoutes);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TheoryRoutingModule { }
