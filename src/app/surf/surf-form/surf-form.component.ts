import { Component, OnInit, Input } from '@angular/core';
import { DetailSpot } from '../detail-spot';
import { SurfService } from '../surf.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.editSpot = true;
    let id = +this.route.snapshot.params['id'];
    this.surfService.getSurfSpot(id)
      .subscribe(fetchedSpot => this.spot = fetchedSpot);

  }

//A MODIFIER
  onSubmit(): void { //Dans l'appli Pokemon, les changement sont déjà pris en compte avec NgModel, nous on veut faire un post.
    console.log("Form Submitted");
    // let link = ["/dashboard/detail-spot", this.spot.id];
    // this.editSpot = false;
    // this.router.navigate(link);
    this.surfService.updateSpot(this.spot)  //Persiste les données modifiées
    .subscribe(() => this.onReturn());  //Puis retourne à la page d'avant
  }

  //A MODIFIER
  onReturn(): void {                        //Fait juste un retour au link d'avant sans persister
    console.log("Back to detail-spot");
    let link = ["/dashboard/detail-spot", this.spot.id];
    this.editSpot = false;
    this.router.navigate(link);
  }

}
