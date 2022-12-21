import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { populateRoutes, RouteEntry } from 'ngx-strong-router';
import { TheoryRootComponent } from './theory-root/theory-root.component';
import { TheoryRouteEntries, theoryRoutes } from './theory.routes';

const componentMap: Record<TheoryRouteEntries, RouteEntry> = {
  [TheoryRouteEntries.Root]: TheoryRootComponent
};

const routes: Routes = populateRoutes(componentMap, theoryRoutes);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TheoryRoutingModule { }
