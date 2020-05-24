import { Injectable } from '@angular/core';
import { SURF_SPOTS } from './mock-surf-spots';
import { DetailSpot } from './detail-spot';

@Injectable({       //Injectable ---> Contribue à l'injection de dépendances dans d'autres modules.
  providedIn: 'root'
})
export class SurfService {

  lat;
  long;
  private zoom: Number;
  origin;
  destination;

  constructor() { }

  getSurfSpots(): DetailSpot[] {
    return SURF_SPOTS;
  }

  getSurfSpot(id: number): DetailSpot {
    let surfSpots = this.getSurfSpots();
    for (let i = 0; i < surfSpots.length; i++) {
      if (id === surfSpots[i].id) {
        return surfSpots[i];
      }
    }
  }

    geoLocate() {

      if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        this.zoom = 16;
      });
      return this.origin = { lat: this.lat, long: this.long};
    }
    else {
      alert("Your Browser does not support geolocation.")
      
    }
  }
}
