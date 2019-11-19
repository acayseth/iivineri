import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {GiphyInterface} from '../interfaces/giphy.interface';

import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  private readonly api: string;
  private readonly key: string;
  private readonly httpOptions: object;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      })
    };
    this.api = 'https://api.giphy.com/v1/gifs';
    this.key = environment.giphy.apiKey;
  }

  public getGif(id: string, tags?: string): Observable<GiphyInterface> {
    if (id) {
      return this.httpClient.get<GiphyInterface>(`${this.api}/${id}?api_key=${this.key}`, this.httpOptions);
    } else {
      return this.httpClient.get<GiphyInterface>(`${this.api}/random?api_key=${this.key}&tag=${tags}&rating=R`, this.httpOptions);
    }
  }
}
