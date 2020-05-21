import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetailSpotComponent } from '../detail-spot/detail-spot.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isDashboardActive: boolean = false;
  isDetailSpotActive: boolean = false;

  constructor(private router : Router) { }

  ngOnInit() {
  }

  selectSpot(): void {
		let link = ['/dashboard/detail-spot'];
    this.router.navigate(link);
    this.isDetailSpotActive = true;
	}

}
