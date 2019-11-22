import {Component, OnInit, ViewChild} from '@angular/core';
import {PlatformLocation} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {CountdownComponent} from 'ngx-countdown';

import {environment} from '../../environments/environment';
import {DaysOfWeekEnum} from '../@core/enums/days-of-week';
import {Gif} from '../@core/classes/gif';

import {GiphyService} from '../@core/services/giphy.service';
import {SnackBarService} from '../@core/services/snack-bar.service';

import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('countdown', {static: false}) private counter: CountdownComponent;

  public gif: Gif;
  private daysOfWeekEnum = DaysOfWeekEnum;
  public ngxCountDownConfig: any;
  public itGif = {isLoaded: false, loading: true};

  constructor(
    private giphyApiService: GiphyService,
    private snackBarService: SnackBarService,
    private activatedRoute: ActivatedRoute,
    private platformLocation: PlatformLocation) {

  }

  private static isoWeekDayFriday(itDayOfWeek: number): string {
    const format = 'YYYY-MM-DD 00:00:00';
    if (itDayOfWeek !== 0 && itDayOfWeek < 5) {
      return moment().isoWeekday(5).format(format);
    } else {
      return moment().add(1, 'weeks').isoWeekday(5).format(format);
    }
  }

  private static itDayOfWeek(): DaysOfWeekEnum {
    return moment().day();
  }

  private static diffDateSecond(itDayOfWeek: number): number {
    const format = 'YYYY-MM-DD HH:mm:ss';
    return Math.abs(
      moment(HomeComponent.isoWeekDayFriday(itDayOfWeek), format)
        .diff(moment(moment().format(format), format), 'seconds', true)
    );
  }

  ngOnInit(): void {
    this.getGif(this.activatedRoute.snapshot.params.id ? this.activatedRoute.snapshot.params.id : null);
    this.setContentFriday();
  }

  public getGif(id?: string): void {
    this.itGif = {isLoaded: false, loading: true};

    const itDayOfWeek = HomeComponent.itDayOfWeek();

    this.giphyApiService.getGif(id,
      itDayOfWeek === 5
        ? environment.giphy.tags.is
        : environment.giphy.tags.not + '+fucking ' + moment.weekdays(itDayOfWeek).toLowerCase()
    ).subscribe(
      gif => {
        this.itGif = {isLoaded: false, loading: false};
        this.gif = new Gif();
        this.gif.id = gif.data.id;
        this.gif.url = gif.data.images.downsized_medium.url;
        this.gif.width = gif.data.images.downsized_medium.width;
        this.gif.height = gif.data.images.downsized_medium.height;
        console.log(this.gif, 'this.gif');
      },
      err => {
        this.itGif = {isLoaded: false, loading: false};
        this.snackBarService.openSnackBar('Nui uăi');
      });
  }

  public copyGifLinkToClipboard(id: string): void {
    const selBox = document.createElement('input');
    selBox.style.position = 'fixed';
    selBox.style.visibility = 'hide';
    selBox.value = `${(this.platformLocation as any).location.origin}/q/${id}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    selBox.remove();
  }

  public onGifLoad() {
    this.itGif.isLoaded = true;
  }

  public onGifError(img: string = '404.gif'): void {
    this.gif.url = './assets/images/' + img;
  }

  public setContentFriday(): void {
    const itDayOfWeek = HomeComponent.itDayOfWeek();
    this.ngxCountDownConfig = {
      tplFriday: this.daysOfWeekEnum[itDayOfWeek],
      leftTime: HomeComponent.diffDateSecond(itDayOfWeek),
      demand: false
    };
  }
}
