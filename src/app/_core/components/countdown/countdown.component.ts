import { Component, OnInit } from '@angular/core';
import { FridayService } from '../../services/friday.service';

@Component({
  selector: 'app-countdown',
  templateUrl: 'countdown.component.html',
  styleUrls: ['countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  public welcomeString: string;
  public countDownStringFormat: string;
  public timestamp: number;

  constructor(private fridayService: FridayService) {
  }

  ngOnInit(): void {
    this.welcomeString = this.fridayService.getDayOfWeek();
    this.timestamp = this.fridayService.lastTime();
  }

  public update($event): void {
    if (!$event) {
      this.welcomeString = this.fridayService.getDayOfWeek();
    }
    this.countDownStringFormat = $event;
  }

}
