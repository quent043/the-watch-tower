import { Component, OnInit, Input } from '@angular/core';
import { DetailSpot } from '../detail-spot';
import { Router, ActivatedRoute } from '@angular/router';
import { SurfService } from '../surf.service';
import { MagicSeaWeedDetailSpot } from '../magicseaweed-spot';
import { MagicSeaWeedDetailSpotTest } from '../magicseaweed-spot-test';

@Component({
  selector: 'app-detail-spot',
  templateUrl: './detail-spot.component.html',
  styleUrls: ['./detail-spot.component.css']
})
export class DetailSpotComponent implements OnInit {

  //listeSpots: DetailSpot[] = null;
  @Input() spot: DetailSpot = null;
  origin: {
    lat: Number, 
    long: Number
  };
  editSpot: Boolean = null;
  deleteConfirm: Boolean = false;
  mswData: MagicSeaWeedDetailSpot = null;
  // mswData: MagicSeaWeedDetailSpotTest[] = null;

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

    /* TODO l'appel au service MSW implique qu'on ait déjà get le spot de notre DB. Sinon on a pas la mswId.
     2 solutions: ou on donne la même valeur aux 2 ID, ou on fait un genre de traitement asynchrone.
     Pour l'instant je met un simple 'if'*/

    //  if(this.spot) {
      // let mswId = this.spot.mswId;
      this.surfService.getSurfSpotInfoMagicSeaWeed(id).
      subscribe(
        fetchedSpot => {
        // this.mswData = fetchedSpot
        this.mswData.mswId = id
        },
        (error) => {console.log("EEEEEEEEERRRRREEEEEURRR: " + error);}
        );
    // }
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
