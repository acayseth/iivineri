import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { SwitchThemeService } from './@core/services/switch-theme.service';

declare var gtag: Function;

@Component({
  selector: 'app-root',
  template: `
    <app-toolbar></app-toolbar>
    <mat-drawer-container>
      <mat-drawer-content>
        <router-outlet></router-outlet>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: [
    'app-toolbar {height:40px;}',
    'mat-drawer-container {height:calc(100vh - 45px);margin-top:5px;}',
    'mat-drawer-content {padding-top:15px}'
  ]
})
export class AppComponent implements AfterViewInit, OnDestroy {

  // @ts-ignore
  private _routerSubscription$: Subscription;

  constructor(
    private switchThemeService: SwitchThemeService,
    private router: Router) {
  }

  ngAfterViewInit(): void {
    this.switchThemeService.initTheme();
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        gtag('config', 'UA-151517869-1', {page_path: event.urlAfterRedirects});
      });
  }

  ngOnDestroy(): void {
    this._routerSubscription$.unsubscribe();
  }

  public set routerSubscription(value: any) {
    this._routerSubscription$ = value;
  }

}
