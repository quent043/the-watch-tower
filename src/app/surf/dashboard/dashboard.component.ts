import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetailSpot } from '../detail-spot';
import { SurfService } from '../surf.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  listeSpots: DetailSpot[] = null;
  isOneSpotSelected: boolean;

  constructor(
    private router: Router,
    private surfService: SurfService      //On peut maintenant faire 'this.SurfService' dans le reste du module,
    ) { }                                 //et son instance est unique

  ngOnInit() {
    this.listeSpots = this.surfService.getSurfSpots();
    this.isOneSpotSelected = false;

  }

  onSelectSpot(detailSpot: DetailSpot) {
    detailSpot.isSelected = true;
    this.isOneSpotSelected = true;
    console.log("Spot Sélectionné " + detailSpot.nom + " " + detailSpot.isSelected + " " + this.isOneSpotSelected)
    let link = ['dashboard/detail-spot', detailSpot.id];
    this.router.navigate(link);
  }

    // Méthode de géolocalisation ---> Retourne un ojbet contenant 'ville' 'long' 'lat'

    // Appel AJAX à l'API magicSeaWeed pour récupérer les infos des 2 spots auxquels on a l'accès

    // Méthode de comparaiton à la BDD locale ----> Utilisation de promesse ? 



}
