import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TheoryRoutingModule } from './theory-routing.module';
import { TheoryRootComponent } from './theory-root/theory-root.component';


@NgModule({
  declarations: [
    TheoryRootComponent
  ],
  imports: [
    CommonModule,
    TheoryRoutingModule
  ]
})
export class TheoryModule { }
