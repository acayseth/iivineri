import {Component, OnInit, ViewChild} from '@angular/core';
import {PlatformLocation} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {CountdownComponent} from 'ngx-countdown';

import {environment} from '../../../environments/environment';

import {GiphyApiService} from '../../@core/services/giphy-api.service';
import {SnackBarService} from '../../@core/services/snack-bar.service';

import {DaysOfWeekEnum} from '../../@core/enums/days-of-week';
import {GifInterface} from '../../@core/interfaces/gif-interface';

import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('countdown', {static: false}) private counter: CountdownComponent;

  private daysOfWeekEnum = DaysOfWeekEnum;
  public ngxCountDownConfig: any;
  public gif: GifInterface;
  public itGif = {isLoaded: false, loading: true};

  constructor(
    private giphyApiService: GiphyApiService,
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

    this.giphyApiService.getGif(id,
      HomeComponent.itDayOfWeek() === 5 ? environment.giphy.tags.is : environment.giphy.tags.not
    ).subscribe(
      gif => {
        this.itGif = {isLoaded: false, loading: false};
        this.gif = gif;
      },
      err => {
        this.itGif = {isLoaded: false, loading: false};
        this.snackBarService.openSnackBar('Oi, blăaa');
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
    this.gif.data.images.downsized.url = './assets/images/' + img;
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
