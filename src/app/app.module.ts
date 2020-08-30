import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SurfModule } from './surf/surf.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ParamsService } from './params.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent
  ],
  imports: [ //On charge d'abord le module Surf avant le module des routes de l'App
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SurfModule,
    AppRoutingModule
  ],
  providers: [ParamsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
