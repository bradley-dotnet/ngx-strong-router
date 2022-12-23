import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { StrongRouterLink } from 'ngx-strong-router';

@Component({
  selector: 'app-setup-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, StrongRouterLink],
  templateUrl: './setup-root.component.html',
  styleUrls: ['./setup-root.component.scss']
})
export class SetupRootComponent {

}
