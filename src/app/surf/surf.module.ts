import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindMapComponent } from './wind-map/wind-map.component';
import { TableHighlightDirective } from './Pipes_Directives/selected-table.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailSpotComponent } from './detail-spot/detail-spot.component';
import { SurfRoutingModule } from './surf-routing/surf-routing.module';
import { SurfService } from './surf.service';
import { PlaceHolderEditDirective } from './Pipes_Directives/place-holder-edit.directive';
import { FormsModule } from '@angular/forms';
import { SurfFormComponent } from './surf-form/surf-form.component';
import { SpotSearchComponent } from './spot-search/spot-search.component';
import { LoaderComponent } from '../loader/loader.component';
import { SurfSpotTypeColorPipe } from './Pipes_Directives/spot-type.pipe';
import { EditSpotComponent } from './edit-spot/edit-spot.component';
import { CreateSpotComponent } from './create-spot/create-spot.component';



@NgModule({
  declarations: [
    WindMapComponent,
    DashboardComponent,
    DetailSpotComponent,
    TableHighlightDirective,
    PlaceHolderEditDirective,
    SurfSpotTypeColorPipe,
    SurfFormComponent,
    SpotSearchComponent,
    LoaderComponent,
    EditSpotComponent,
    CreateSpotComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SurfRoutingModule,
    
  ],
  providers: [
    SurfService
  ]
})
export class SurfModule { }
