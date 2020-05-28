import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { SURF_SPOTS } from './surf/mock-surf-spots';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let spots = SURF_SPOTS;  //---> requête get.('api/spots') va renvoyer SURF_SPOTS ; get.('api/spots/1') renvoie le spot d'ID 1 etc.
    return { spots };
  }

  constructor() { }
}

//CreateDb simule une bdd et une API pour effectuer des requêtes dessus.