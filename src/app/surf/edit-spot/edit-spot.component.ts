import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailSpot } from '../detail-spot';
import { SurfService } from '../surf.service';

@Component({
  selector: 'app-edit-spot',
  templateUrl: './edit-spot.component.html',
  styleUrls: ['./edit-spot.component.css']
})
export class EditSpotComponent implements OnInit {

  // spot: DetailSpot = null;
  @Input() spot: DetailSpot;
  private editSpot: Boolean;

  constructor(
    private surfService: SurfService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // this.editSpot = true;
    let id = +this.route.snapshot.params['id'];
    this.surfService.getSurfSpot(id)
      .then(fetchedSpot => this.spot = fetchedSpot);

  }

}
