import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FridayService } from './friday.service';

import { IGiphy } from '../interface/giphy';

import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  private readonly url: string = 'https://api.giphy.com/v1/gifs';
  private readonly httpOptions: { headers: HttpHeaders; params: HttpParams; } = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache'),
    params: new HttpParams()
      .set('api_key', 'p48aHAVlKkaRsajnuIQvVpElRGe56lBa')
      .set('rating', 'R'),
  };

  constructor(private httpClient: HttpClient, private fridayService: FridayService) {
  }

  public getGiphy(id: string): Observable<IGiphy> {
    this.httpOptions.params = this.httpOptions.params.append(
      'tag',
      this.fridayService.has() ? environment.giphy.tags.is : environment.giphy.tags.not
    );
    return this.httpClient.get<IGiphy>(id ? `${this.url}/${id}` : `${this.url}/random`, this.httpOptions);
  }

}
