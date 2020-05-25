import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindMapComponent } from './wind-map/wind-map.component';
import { TableHighlightDirective } from './dashboard/selected-table.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailSpotComponent } from './detail-spot/detail-spot.component';
import { SurfRoutingModule } from './surf-routing/surf-routing.module';
import { SurfService } from './surf.service';
import { PlaceHolderEditDirective } from './Pipes_Directives/place-holder-edit.directive';
import { FormsModule } from '@angular/forms';
import { SurfFormComponent } from './surf-form/surf-form.component';
import { TypeSpotColorPipe } from './Pipes_Directives/type-spot-color.pipe';



@NgModule({
  declarations: [
    WindMapComponent,
    DashboardComponent,
    DetailSpotComponent,
    TableHighlightDirective,
    PlaceHolderEditDirective,
    SurfFormComponent,
    TypeSpotColorPipe
  ],
  imports: [
    CommonModule,
    SurfRoutingModule,
    FormsModule
  ],
  providers: [
    SurfService
  ]
})
export class SurfModule { }