import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IGiphy } from '../interfaces/gif';

@Injectable({providedIn: 'root'})
export class GiphyService {

  private readonly httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    })
  };

  constructor(private http: HttpClient) {
  }

  public getRandom(tags: string = ''): Observable<IGiphy> {
    return this.http.get<IGiphy>(
      `${environment.giphy.url}/random?api_key=${environment.giphy.apiKey}&tag=${tags}&rating=R`,
      this.httpOptions
    );
  }

  public getById(id: string = ''): Observable<IGiphy> {
    return this.http.get<IGiphy>(
      `${environment.giphy.url}/${id}?api_key=${environment.giphy.apiKey}`,
      this.httpOptions
    );
  }

}
