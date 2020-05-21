import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailSpotComponent } from './detail-spot/detail-spot.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WindMapComponent } from './wind-map/wind-map/wind-map.component';
import { TableHighlightDirective } from './dashboard/selected-table.directive';

@NgModule({
  declarations: [
    AppComponent,
    DetailSpotComponent,
    HeaderComponent,
    DashboardComponent,
    PageNotFoundComponent,
    WindMapComponent,
    TableHighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
