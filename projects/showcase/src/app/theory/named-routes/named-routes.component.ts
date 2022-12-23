import { Component } from '@angular/core';
import { NavigationTargets } from '../../navigation-targets.enum';

@Component({
  selector: 'app-named-routes',
  templateUrl: './named-routes.component.html',
  styleUrls: ['../theory-page.scss']
})
export class NamedRoutesComponent {
  public NavigationTargets: typeof NavigationTargets = NavigationTargets;
}
