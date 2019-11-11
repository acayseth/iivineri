import {Component} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {PlatformLocation} from '@angular/common';
import {Meta} from '@angular/platform-browser';
import {googleAnalytics} from '../assets/scripts/google-analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private meta: Meta,
    private platformLocation: PlatformLocation,
    private router: Router) {

    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        const url = e.url;
        if (url !== null && url !== undefined && url !== '' && url.indexOf('null') < 0) {
          googleAnalytics(url);
        }
      }
    });

    this.meta.addTag({name: 'og:site_name', content: 'iivineri'});
    this.meta.addTag({name: 'title', content: 'iiVineri?'});
    this.meta.addTag({name: 'description', content: 'Unde-i Vinerea?'});
    this.meta.addTag({name: 'url', content: `${(platformLocation as any).location.origin}`});


    this.meta.addTag({name: 'og:type', content: 'website'});
    this.meta.addTag({name: 'og:title', content: 'iiVineri?'});
    this.meta.addTag({name: 'og:description', content: 'Unde-i Vinerea'});
    this.meta.addTag({name: 'og:url', content: `${(platformLocation as any).location.origin}`});
    this.meta.addTag({name: 'og:image', content: `${(platformLocation as any).location.origin}/assets/images/logo.png`});
  }
}
