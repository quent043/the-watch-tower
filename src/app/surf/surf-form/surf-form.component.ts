import { Component, OnInit, Input } from '@angular/core';
import { DetailSpot } from '../detail-spot';
import { SurfService } from '../surf.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-surf-form',
  templateUrl: './surf-form.component.html',
  styleUrls: ['./surf-form.component.css']
})
export class SurfFormComponent implements OnInit {

  @Input() spot: DetailSpot;

  constructor(
    private surfService: SurfService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  onSubmit(): void { //Dans l'appli Pokemon, les changement sont déjà pris en compte avec NgModel, nous on veut faire un post.
    console.log("Form Submitted");
    let link = ["/dashboard/detail-spot", this.spot.id];
    this.router.navigate(link);
  }
}
