import { Component, OnInit } from '@angular/core';
import { DetailSpot } from '../detail-spot';
import { Router, ActivatedRoute } from '@angular/router';
import { SURF_SPOTS } from '../mock-surf-spots';

@Component({
  selector: 'app-detail-spot',
  templateUrl: './detail-spot.component.html',
  styleUrls: ['./detail-spot.component.css']
})
export class DetailSpotComponent implements OnInit {

  listeSpots: DetailSpot[] = null;
  spot: DetailSpot = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {

    this.listeSpots = SURF_SPOTS;

    let id = +this.route.snapshot.params['id'];
    for (let i = 0; i < this.listeSpots.length; i++) {
      if( this.listeSpots[i].id == id) {
        this.spot = this.listeSpots[i];
      }
    }
  }



}
