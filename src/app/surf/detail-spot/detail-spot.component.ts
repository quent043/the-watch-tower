import { Component, OnInit } from '@angular/core';
import { DetailSpot } from '../detail-spot';
import { Router, ActivatedRoute } from '@angular/router';
import { SurfService } from '../surf.service';

@Component({
  selector: 'app-detail-spot',
  templateUrl: './detail-spot.component.html',
  styleUrls: ['./detail-spot.component.css']
})
export class DetailSpotComponent implements OnInit {

  //listeSpots: DetailSpot[] = null;
  spot: DetailSpot = null;
  origin: {
    lat: Number, 
    long: Number
  };
  editSpot: Boolean = null;
  deleteConfirm: Boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private surfService: SurfService
    ) { }

  ngOnInit() {

    let id = +this.route.snapshot.params['id'];
      // this.spot = this.surfService.getSurfSpot(id);
      this.surfService.getSurfSpot(id)
      .subscribe(fetchedSpot => this.spot = fetchedSpot);

    this.origin = this.surfService.geoLocate();
    this.editSpot = false;
  }

  onEdit(spot: DetailSpot): void {
    this.editSpot = true;
    console.log("EditSpot: " + this.editSpot);
    console.log("Objet envoyé: "+ spot.nom + " " + spot.id);
    let link = ['dashboard/detail-spot/edit', spot.id];
    this.router.navigate(link);
  }

  onReturn(): void {
    let link = ['dashboard/'];
    this.router.navigate(link);
  }

  delete(spot: DetailSpot): void {
    
    this.surfService.deleteSpot(spot)
    .subscribe(() => this.onReturn());
  }


    deleteConfirmClick(spot: DetailSpot): void {
      console.log("Supprimer ?" + spot.nom + " ?")
      this.deleteConfirm = true;
      // if(confirm("Êtes-vous sur de vouloir supprimer le spot " + spot.nom + "?")) {
      //   console.log("Spot " + spot.nom + " supprimé");
      //   this.delete(spot);
      // }
      // else {
      //   console.log("Annulation se la suppression");
      // }
    }

    onCancelDelete() {
      this.deleteConfirm = false;
    }



}
