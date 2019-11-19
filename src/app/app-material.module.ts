import {NgModule} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {
  MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatCardModule, MatProgressSpinnerModule, MatIconRegistry,
  MatSnackBarModule, MatListModule, MatMenuModule
} from '@angular/material';

@NgModule({
  imports: [
    MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatCardModule, MatProgressSpinnerModule, MatSnackBarModule,
    MatListModule, MatMenuModule
  ],
  exports: [
    MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatCardModule, MatProgressSpinnerModule, MatSnackBarModule,
    MatListModule, MatMenuModule
  ]
})

export class AppMaterialModule {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {

    this.matIconRegistry.addSvgIcon(`github`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/github.svg')
    );
    this.matIconRegistry.addSvgIcon(`iivineri`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/logo.svg')
    );
  }

}
