import { Component } from '@angular/core';
import { NavigationTargets } from '../../navigation-targets.enum';

@Component({
  selector: 'app-magic-urls',
  templateUrl: './magic-urls.component.html',
  styleUrls: ['../theory-page.scss']
})
export class MagicUrlsComponent {
  public NavigationTargets: typeof NavigationTargets = NavigationTargets;
}
