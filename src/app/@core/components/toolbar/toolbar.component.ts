import { Component, OnInit } from '@angular/core';

import { FridayService } from 'src/app/@core/services/friday.service';
import { SwitchThemeService } from '../../services/switch-theme.service';

declare var gtag: Function;

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  private _isFriday: boolean = false;
  private _isDarkMode: boolean = false;

  constructor(private switchThemeService: SwitchThemeService, private fridayService: FridayService) {
    this.isDarkMode = this.switchThemeService.isDarkMode;
    this.isFriday = this.fridayService.has();
  }

  ngOnInit(): void {

  }

  public get isDarkMode(): boolean {
    return this._isDarkMode;
  }

  public set isDarkMode(value: boolean) {
    this._isDarkMode = value;
  }

  public get isFriday(): boolean {
    return this._isFriday;
  }

  public set isFriday(value: boolean) {
    this._isFriday = value;
  }

  public toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.switchThemeService.switch(!this.isDarkMode);
  }

  public goTo(link: string): void {
    gtag('config', 'UA-151517869-1', {page_path: link});
    window.open(link, '_blank');
  }

}
