import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

import {GifInterface} from '../interfaces/gif-interface';

import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GiphyApiService {
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

  public getGif(id: string, tags?: string): Observable<GifInterface> {
    console.log(tags, 'tags');
    if (id) {
      return this.httpClient.get<GifInterface>(`${this.api}/${id}?api_key=${this.key}`, this.httpOptions);
    } else {
      return this.httpClient.get<GifInterface>(`${this.api}/random?api_key=${this.key}&tag=${tags}&rating=R`, this.httpOptions);
    }
  }
}
