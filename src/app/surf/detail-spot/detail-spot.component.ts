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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private surfService: SurfService
    ) { }

  ngOnInit() {

    let id = +this.route.snapshot.params['id'];
      this.spot = this.surfService.getSurfSpot(id);

    let origin = this.surfService.geoLocate();
  }

}
