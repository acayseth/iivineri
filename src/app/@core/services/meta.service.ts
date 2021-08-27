import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

import { IGiphy } from 'src/app/@core/interface/giphy';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  private readonly hostself: string = `${window.location.protocol}//${window.location.hostname}/_`;

  constructor(private meta: Meta) {
  }

  private set(metaKey: string, metaName: string, content: string): void {
    this.meta.addTag({metaKey: metaName, content})
  }

  public setMeta(giphy: IGiphy): void {
    this.set('property', 'og:image', giphy.data.image_url|| giphy.data.bitly_gif_url);
    this.set('property', 'og:url', `${this.hostself}/${giphy.data.id}`);
    this.set('name', 'al:web:url', `${this.hostself}/${giphy.data.id}`);
    this.set('property', 'og:image:url', giphy.data.image_url || giphy.data.bitly_gif_url);
    this.set('name', 'og:image:url', giphy.data.image_url|| giphy.data.bitly_gif_url);
    this.set('name', 'twitter:image', giphy.data.image_url|| giphy.data.bitly_gif_url);
    this.set('name', 'twitter:app:url:iphone', `${this.hostself}/${giphy.data.id}`);
    this.set('name', 'twitter:app:url:ipad', `${this.hostself}/${giphy.data.id}`);
    this.set('name', 'twitter:app:url:googleplay', `${this.hostself}/${giphy.data.id}`);
    this.set('property', 'al:ios:url', `${this.hostself}/${giphy.data.id}`);
    this.set('property', 'al:android:url', `${this.hostself}/${giphy.data.id}`);
    this.set('name', 'al:android:url', `${this.hostself}/${giphy.data.id}`);
  }

}
