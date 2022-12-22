import { Component } from '@angular/core';
import { NavigationTargets } from './navigation-targets.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public NavigationTargets: typeof NavigationTargets = NavigationTargets;
}
