import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';

import { ToolbarComponent } from './@core/components/toolbar/toolbar.component';
import { CountdownComponent } from './@core/components/countdown/countdown.component';
import { CountdownDirective } from './@core/components/countdown/countdown.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, ToolbarComponent, CountdownComponent, CountdownDirective,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, AppMaterialModule, AppRoutingModule, FlexLayoutModule, HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
