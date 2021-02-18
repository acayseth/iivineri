import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-toolbar></app-toolbar>
    <app-countdown></app-countdown>
    <mat-drawer-container>
      <mat-drawer-content>
        <router-outlet></router-outlet>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: [
    'mat-drawer-container {height: calc(100vh - 136px - 40px)}',
    'app-countdown {padding: 0 1px;}'
  ]
})
export class AppComponent {
}
