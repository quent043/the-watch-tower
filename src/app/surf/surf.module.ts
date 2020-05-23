import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindMapComponent } from './wind-map/wind-map.component';
import { TableHighlightDirective } from './dashboard/selected-table.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailSpotComponent } from './detail-spot/detail-spot.component';
import { SurfRoutingModule } from './surf-routing/surf-routing.module';



@NgModule({
  declarations: [
    WindMapComponent,
    DashboardComponent,
    DetailSpotComponent,
    TableHighlightDirective
  ],
  imports: [
    CommonModule,
    SurfRoutingModule
  ]
})
export class SurfModule { }
