import { Injectable } from '@angular/core';
import * as moment from 'moment';

import {DaysOfWeekEnum} from '../enums/days-of-week';

@Injectable({providedIn: 'root'})
export class FridayService {

  private readonly daysOfWeek = DaysOfWeekEnum;

  public getDayOfWeek(): string {
    return this.daysOfWeek[moment().day()];
  }

  public isFriday(): boolean {
    return moment().day() === 5;
  }

  public lastTime(): number {
    return Math.round(
      moment(moment().isoWeekday(5).format('YYYY-MM-DD 00:00:00'))
        .diff(
          moment(moment(), 'YYYY-MM-DD HH:MM:SS'), 'seconds', true
        )
    );
  }

}
