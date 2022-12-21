import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-setup-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './setup-root.component.html',
  styleUrls: ['./setup-root.component.scss']
})
export class SetupRootComponent {

}
