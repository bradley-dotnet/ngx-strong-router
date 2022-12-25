import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { StrongRouterLink } from 'ngx-strong-router';
import { NavigationTargets } from '../../navigation-targets.enum';

@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['../setup-page.scss', '../code-block.scss'],
  standalone: true,
  imports: [MatCardModule, MatDividerModule, StrongRouterLink, MatButtonModule]
})
export class BasicsComponent {
  public NavigationTargets: typeof NavigationTargets = NavigationTargets;
}
