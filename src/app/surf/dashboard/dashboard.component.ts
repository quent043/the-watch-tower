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
  origin: {
    lat: Number, 
    long: Number
  };

  constructor(
    private router: Router,
    private surfService: SurfService      //On peut maintenant faire 'this.SurfService' dans le reste du module,
    ) { }                                 //et son instance est unique

  ngOnInit() {
    this.getSpots();
    this.isOneSpotSelected = false;
    this.origin = this.surfService.geoLocate(); //TODO Je ne sais pas pk mais si on ne géolocate pas ici, la géolocation ne se fait pas au premier appel dans la page 
    //de détail, il faut refresh
  }

  getSpots(): void {
    // this.listeSpots = this.surfService.getSurfSpots();
    this.surfService.getSurfSpots()
    .subscribe(liste => this.listeSpots = liste); //liste c'est le nom 
    //qu'on donne au paramètre de retour de l'observable retourné par la méthode.
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
