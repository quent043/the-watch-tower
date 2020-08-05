import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SurfModule } from './surf/surf.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { LoaderComponent } from './loader/loader.component';
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
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false}), //L'encapsulation renvoie un objet avec une clef 'data' quand on met a 'true'
    SurfModule,
    AppRoutingModule
  ],
  providers: [ParamsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
