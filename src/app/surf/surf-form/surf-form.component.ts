import { Component, OnInit, Input } from '@angular/core';
import { DetailSpot } from '../detail-spot';
import { SurfService } from '../surf.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-surf-form',
  templateUrl: './surf-form.component.html',
  styleUrls: ['./surf-form.component.css']
})
export class SurfFormComponent implements OnInit {

  // spot: DetailSpot = null;
  @Input() spot: DetailSpot;
  private editSpot: Boolean;

  constructor(
    private surfService: SurfService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.editSpot = true;
    let id = +this.route.snapshot.params['id'];
    this.surfService.getSurfSpot(id)
      .then(fetchedSpot => this.spot = fetchedSpot);

  }
  //TODO: Ajouter règles validation.

  onSubmit(): void {
    console.log("Form Submitted");
    console.log("Data Submitted:" + this.spot.nom)

    this.surfService.updateSpot(this.spot)  //Persiste les données modifiées
    .subscribe(() => this.onReturn());  //Puis retourne à la page d'avant
  }

  onReturn(): void {                        //Fait juste un retour au link d'avant sans persister
    console.log("Back to detail-spot");
    let link = ["/dashboard/detail-spot", this.spot.id];
    this.editSpot = false;
    this.router.navigate(link);
  }

  onReturnTest(): void {
    this.location.back();
  }

  onFocus(): void {
    
  }

}
