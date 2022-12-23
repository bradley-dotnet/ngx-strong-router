import { Component } from '@angular/core';
import { NavigationTargets } from '../../navigation-targets.enum';

@Component({
  selector: 'app-strong-routes',
  templateUrl: './strong-routes.component.html',
  styleUrls: ['../theory-page.scss']
})
export class StrongRoutesComponent {
  public NavigationTargets: typeof NavigationTargets = NavigationTargets;
}
