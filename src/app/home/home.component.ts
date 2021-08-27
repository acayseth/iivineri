import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { GiphyService } from '../@core/services/giphy.service';
import { MetaService } from '../@core/services/meta.service';

import { IGiphy } from 'src/app/@core/interface/giphy';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private _loading: boolean = false;
  public giphy: IGiphy | undefined;

  constructor(
    private activatedRoute: ActivatedRoute, private giphyService: GiphyService,
    private metaService: MetaService, private platformLocation: PlatformLocation) {

  }

  public get loading(): boolean {
    return this._loading;
  }

  public set loading(value: boolean) {
    this._loading = value;
  }

  ngOnInit(): void {
    this.nextGiphy(this.activatedRoute.snapshot.params.id || '');
  }

  public nextGiphy(id: string = ''): void {
    this.loading = true;
    this.giphyService.getGiphy(id).subscribe((giphy: IGiphy) => {
      this.giphy = giphy;
      this.metaService.setMeta(giphy);
      this.loading = false;
    })
  }

  public clipLink(): void {
    const selBox = document.createElement('input');
    selBox.style.position = 'fixed';
    selBox.style.visibility = 'hide';

    selBox.value = `${(this.platformLocation as any).location.origin}/_/${this.giphy?.data.id}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    selBox.remove();
  }

}
