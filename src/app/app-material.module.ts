import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';

const __materialModules = [
  MatIconModule, MatButtonModule, MatCardModule, MatSidenavModule, MatProgressSpinnerModule, MatToolbarModule
];

@NgModule({
  imports: __materialModules,
  exports: __materialModules,
})
export class AppMaterialModule {

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/github.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'iivineri',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/logo.svg')
    );
  }

}
