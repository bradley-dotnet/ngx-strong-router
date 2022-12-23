import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { StrongRouterLink } from 'ngx-strong-router';

import { TheoryRoutingModule } from './theory-routing.module';
import { TheoryRootComponent } from './theory-root/theory-root.component';
import { MagicUrlsComponent } from './magic-urls/magic-urls.component';
import { RefactoringMishapsComponent } from './refactoring-mishaps/refactoring-mishaps.component';
import { NamedRoutesComponent } from './named-routes/named-routes.component';
import { StrongRoutesComponent } from './strong-routes/strong-routes.component';


@NgModule({
  declarations: [
    TheoryRootComponent,
    MagicUrlsComponent,
    RefactoringMishapsComponent,
    NamedRoutesComponent,
    StrongRoutesComponent
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatDividerModule,
    StrongRouterLink,
    TheoryRoutingModule
  ]
})
export class TheoryModule { }
