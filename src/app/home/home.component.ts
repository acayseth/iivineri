import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { FridayService } from '../_core/services/friday.service';
import { GiphyService } from '../_core/services/giphy.service';
import { IGif, IGiphy } from '../_core/interfaces/gif';
import { SnackService } from '../_core/services/snack.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public gif: IGif = {
    id: '', url: '', width: '', height: '',
  };
  public loading = false;
  public gifLoad = false;

  constructor(
    private fridayService: FridayService,
    private giphyService: GiphyService,
    private activatedRoute: ActivatedRoute,
    private snack: SnackService,
    private platformLocation: PlatformLocation
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.snapshot.params.id
      ? this.getGifById(this.activatedRoute.snapshot.params.id)
      : this.getGifRandom();
  }

  public getGifById(id?: string): void {
    this.loading = true;
    this.giphyService.getById(id).subscribe(
      gif => this.gif = this.generatorOrNext(gif),
      () => this.snack.open('Oppssss', 'Închide')
    );
  }

  public getGifRandom(): void {
    this.loading = true;
    const tags = this.fridayService.isFriday()
      ? environment.giphy.tags.is
      : environment.giphy.tags.not;
    this.giphyService.getRandom(tags).subscribe(
      gif => this.gif = this.generatorOrNext(gif),
      () => this.snack.open('Oppssss', 'Închide')
    );
  }

  private generatorOrNext(gif: IGiphy): IGif {
    this.loading = false;
    this.gifLoad = false;
    return {
      id: gif.data.id,
      url: gif.data.images.downsized_medium.url,
      width: gif.data.images.downsized_medium.width,
      height: gif.data.images.downsized_medium.height
    };
  }

  public onGifLoad(): void {
    this.gifLoad = true;
  }

  public onGifError(): void {
    this.gifLoad = false;
    this.loading = true;
  }

  public copyGifLinkToClip(id: string): void {
    const selBox = document.createElement('input');
    selBox.style.position = 'fixed';
    selBox.style.visibility = 'hide';
    selBox.value = `${(this.platformLocation as any).location.origin}/q/${id}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    selBox.remove();
  }

}
