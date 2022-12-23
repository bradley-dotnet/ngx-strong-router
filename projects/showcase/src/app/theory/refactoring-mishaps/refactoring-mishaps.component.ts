import { Component } from '@angular/core';
import { NavigationTargets } from '../../navigation-targets.enum';

@Component({
  selector: 'app-refactoring-mishaps',
  templateUrl: './refactoring-mishaps.component.html',
  styleUrls: ['../theory-page.scss']
})
export class RefactoringMishapsComponent {
  public NavigationTargets: typeof NavigationTargets = NavigationTargets;
}
