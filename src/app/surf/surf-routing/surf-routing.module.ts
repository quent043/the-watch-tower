import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DetailSpotComponent } from '../detail-spot/detail-spot.component';
import { WindMapComponent } from '../wind-map/wind-map.component';
import { SurfFormComponent } from '../surf-form/surf-form.component';

//Routes

const surfRoutes: Routes = [
  {
    path: 'dashboard',
    children: [
      
      { path: 'detail-spot/:id', component: DetailSpotComponent},
      { path: 'wind-map', component: WindMapComponent},
      { path: 'spot-edit/:id', component: SurfFormComponent},
      { path: '', component: DashboardComponent}
    ]
  }

  // { path: 'dashboard', component: DashboardComponent},
  // { path: 'dashboard/detail-spot/edit/:id', component: SurfFormComponent},
  // { path: 'dashboard/detail-spot/:id', component: DetailSpotComponent},
  // { path: 'dashboard/wind-map', component: WindMapComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(surfRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SurfRoutingModule { }
