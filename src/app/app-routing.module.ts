import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailSpotComponent } from './detail-spot/detail-spot.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WindMapComponent } from './wind-map/wind-map/wind-map.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
    //  children: [    
    //    { path: 'detail-spot', component: DetailSpotComponent }]},
  { path: 'dashboard/detail-spot/:id', component: DetailSpotComponent},
  { path: 'dashboard/wind-map', component: WindMapComponent},
  { path: 'default', component: DashboardComponent },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
