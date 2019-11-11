import {Component} from '@angular/core';

import {googleAnalytics} from '../../../../assets/scripts/google-analytics';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor() {
  }

  public goTo(link: string): void {
    googleAnalytics(link);
    window.open(link, '_blank');
  }

}
