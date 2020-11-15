import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetailSpot } from '../detail-spot';
import { SurfService } from '../surf.service';
import { MagicSeaWeedDetailSpotTest } from '../magicseaweed-spot-test';
import { MagicSeaWeedDetailSpot } from '../magicseaweed-spot';
import { Observer, Observable } from 'rxjs';

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
  liveDataTable: MagicSeaWeedDetailSpot[];

  constructor(
    private router: Router,
    private surfService: SurfService      //On peut maintenant faire 'this.SurfService' dans le reste du module,
    ) { }                                 //et son instance est unique

  ngOnInit() {
    this.getSpots2();
    this.isOneSpotSelected = false;
    this.origin = this.surfService.geoLocate(); //TODO Je ne sais pas pk mais si on ne géolocate pas ici, la géolocation ne se fait pas au premier appel dans la page 
    //de détail, il faut refresh
    this.getLiveData();
  }

  getSpots(): void { 
    this.surfService.getSurfSpots()
    .subscribe(
      liste => this.listeSpots = liste, //Tout ça c'est un Observer, on aurait pu le sortir dans une variable
      error => console.log(error));     //Comme la méthode getSpots2 en dessous. Même chose.
  }

  getSpots2(): void { 
    this.surfService.getSurfSpots()
    .subscribe(this.obs) 
  }

  obs: Observer<DetailSpot[]> = {
    next: liste => this.listeSpots = liste,
    error: error => console.log(error),
    complete: () => console.log("Complete")
  }

  getLiveData(): void {
    this.surfService.getSurfSpotInfoMagicSeaWeed(1570)
    .subscribe(
      data => this.liveDataTable = data,
      error => console.log(error));
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
