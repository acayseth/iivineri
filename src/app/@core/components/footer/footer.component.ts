import {Component} from '@angular/core';
import {googleAnalytics} from '../../../../assets/scripts/google-analytics';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  private readonly gitHubLink: string;
  public env = environment;

  constructor() {
    this.gitHubLink = 'https://github.com/acayseth/iivineri';
  }

  goToGitHub(): void {
    googleAnalytics(this.gitHubLink);
    window.open(this.gitHubLink, '_blank');
  }

}
