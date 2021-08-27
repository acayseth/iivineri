import { Component, OnInit } from '@angular/core';

import { FridayService } from '../../services/friday.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  public welcomeString: string;
  public countDownStringFormat: string | undefined;
  public timestamp: number;

  constructor(private fridayService: FridayService) {
    this.welcomeString = this.fridayService.daysOfWeek();
    this.timestamp = this.fridayService.leftTime();
  }

  ngOnInit(): void {
  }

  public update($event: any): void {
    if (!$event) {
      this.welcomeString = this.fridayService.daysOfWeek();
    }
    this.countDownStringFormat = $event;
  }

}
