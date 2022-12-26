import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

interface Parameter {
  name: string;
  description: string;
}

const targetParameter: Parameter = {
  name: 'target',
  description: 'NavigationTarget to navigate/link to.'
}

const routeParamsParameter: Parameter = {
  name: 'params',
  description: 'Object containing route parmeters for the target being requested.'
}

const extrasParameter: Parameter = {
  name: 'extras',
  description: 'NavigationExtras passed on to the Angualr router, for query parms, route data, etc.'
}

const currentRouteParameter: Parameter = {
  name: 'current',
  description: 'ActivatedRouteSnapshot for the current route.'
}

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule]
})
export class ApiComponent {
  public navigateParams: Parameter[] = [targetParameter, routeParamsParameter, extrasParameter];
  public linkParams: Parameter[] = [targetParameter, routeParamsParameter];
  public navigateRelativeParams: Parameter[] = [targetParameter, currentRouteParameter, routeParamsParameter, extrasParameter];
  public linkRelativeParams: Parameter[] = [targetParameter, currentRouteParameter, routeParamsParameter];

  public linkDirectiveParams: Parameter[] = [
    { name: 'ngxStrongRouterLink', description: 'NavigationTarget to navigate to.' },
    { name: 'routeParams', description: 'Object containing route parmeters for the target being requested.' },
    { name: 'navigateRelative', description: 'Set to true to navigate relative to the current route' }
  ]
}
