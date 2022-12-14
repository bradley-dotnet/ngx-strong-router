import { Component } from '@angular/core';
import { NavigationTargets } from '../../navigation-targets.enum';

@Component({
  selector: 'app-theory-root',
  templateUrl: './theory-root.component.html',
  styleUrls: ['./theory-root.component.scss']
})
export class TheoryRootComponent {
  public NavigationTargets: typeof NavigationTargets = NavigationTargets;
}
