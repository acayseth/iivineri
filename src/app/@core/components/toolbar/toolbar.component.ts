import {Component, OnInit} from '@angular/core';

import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public isProd = environment.production;

  constructor() {
  }

  ngOnInit() {
  }

}
