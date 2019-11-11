import {Component} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {googleAnalytics} from '../assets/scripts/google-analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router) {

    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        const url = e.url;
        if (url !== null && url !== undefined && url !== '' && url.indexOf('null') < 0) {
          googleAnalytics(url);
        }
      }
    });
  }
}
