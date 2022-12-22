import { Component } from '@angular/core';
import { NavigationTargets } from '../navigation-targets.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public NavigationTargets: typeof NavigationTargets = NavigationTargets;
}
