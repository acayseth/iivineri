import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatCardModule, MatProgressSpinnerModule, MatSnackBarModule,
    MatListModule, MatMenuModule
  ],
  exports: [
    MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatCardModule, MatProgressSpinnerModule, MatSnackBarModule,
    MatListModule, MatMenuModule
  ],
})
export class AppMaterialModule {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon('github', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/github.svg'));
    this.matIconRegistry.addSvgIcon('iivineri', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/logo.svg'));
  }

}
