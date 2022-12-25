import { Component } from '@angular/core';
import { NavigationTargets } from '../../navigation-targets.enum';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { StrongRouterLink } from 'ngx-strong-router';


@Component({
  selector: 'app-navigating',
  templateUrl: './navigating.component.html',
  styleUrls: ['../setup-page.scss', '../code-block.scss'],
  standalone: true,
  imports: [MatCardModule, MatDividerModule, StrongRouterLink, MatButtonModule]
})
export class NavigatingComponent {
  public NavigationTargets: typeof NavigationTargets = NavigationTargets;
}
