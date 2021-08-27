import * as moment from 'moment';
import { Injectable } from '@angular/core';

import { DaysOfWeekEnum } from '../enums/days-of-week';

@Injectable({providedIn: 'root'})
export class FridayService {

  private readonly _daysOfWeek;

  constructor() {
    this._daysOfWeek = DaysOfWeekEnum;
  }

  public daysOfWeek(): any {
    return this._daysOfWeek[moment().day()];
  }

  public has(): boolean {
    return moment().day() === 5;
  }

  public leftTime(): number {
    return Math.round(
      moment(moment().isoWeekday(5).format('YYYY-MM-DD 00:00:00')).diff(
        moment(moment(), 'YYYY-MM-DD HH:MM:SS'), 'seconds', true
      )
    );
  }

}
