import { Directive, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { Subject, Subscription, timer } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

@Directive({
  selector: '[appCountdown]'
})
export class CountdownDirective implements OnChanges, OnDestroy {

  private counterSource$ = new Subject<any>();
  private subscription = Subscription.EMPTY;

  @Input()
  public counter: number;

  @Output()
  value = new EventEmitter<string>();

  constructor() {
    this.subscription = this.counterSource$.pipe(
      switchMap(({interval, count}) =>
        timer(0, interval).pipe(
          take(count),
          tap(() => this.value.emit(CountdownDirective.convertTimestampToString(--count)))
        )
      )
    ).subscribe();
  }

  private static convertTimestampToString(count: number): string {
    const normalizeTimeNumToStr = (n: number) => n < 10 ? `0${n}` : String(n);
    let text = environment.countdown.format.trim();
    let delta = count;
    const days = Math.floor(delta / 86400);
    delta -= days * 86400;
    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    const seconds = delta % 60;

    text = days
      ? text.replace('{dd}', String(days))
      : text.replace(`{dd} ${environment.countdown.day}`, '');

    text = text.replace('{hh}', normalizeTimeNumToStr(hours))
      .replace('{mm}', normalizeTimeNumToStr(minutes))
      .replace('{ss}', normalizeTimeNumToStr(seconds));

    return `${environment.countdown.constant} ${text}`;
  }

  ngOnChanges(): void {
    this.counterSource$.next({count: this.counter, interval: 1000});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
