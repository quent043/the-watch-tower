import { Injectable } from '@angular/core';
import { SURF_SPOTS } from './mock-surf-spots';
import { DetailSpot } from './detail-spot';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ParamsService } from '../params.service';
import { MagicSeaWeedDetailSpot } from './magicseaweed-spot';
import { MagicSeaWeedDetailSpotTest } from './magicseaweed-spot-test';

@Injectable({
  providedIn: 'root'
})
export class SurfService {

  lat: Number;
  long: Number;
  private zoom: Number;
  origin;
  destination;

  constructor(
    private http: HttpClient,
    private params: ParamsService
  ) { }

  private spotsUrl = 'http://localhost:8080/the_watch_tower';
  private mswUrl = 'http://magicseaweed.com/api';
  // private mswUrlParameters = '&units=eu&fields=localTimestamp,swell.unit,swell.components.*,wind.*,condition.*';
  private mswUrlParameters = '&units=eu&fields=localTimestamp';
  private mswApiKey = this.params.getMagicSeaWeedApiKey();

  getSurfSpots(): Observable<DetailSpot[]> {
    const url = `${this.spotsUrl}/getAll`;

    this.http.get<DetailSpot[]>(url).toPromise()
    .then(data => console.log(data))
    .then(data => console.log(data));
    // TODO: PK seulement la première valeur s'affiche et on a 'undefined' pour la 2eme? 
    //Promise consommable une fois, pour l'observable onpeut le farie plusieurs fois


    return this.http.get<DetailSpot[]>(url).pipe(
      tap(data => this.log(`Observable: fetched spot: ${JSON.stringify(data)}`)),
      tap(data => this.log(`Observable: fetched spot: ${JSON.stringify(data)}`)),
      catchError(this.handleError(`get Spots`, []))
    );
                                                      
  }

  getSurfSpot(id: number): Promise<DetailSpot> {
    const url = `${this.spotsUrl}/${id}`;
    console.log("méthode getSurfSpot(), résultat de requête get: " + this.http.get<DetailSpot>(url))
    return this.http.get<DetailSpot>(url).toPromise()
    //.then(data => {console.log(`Fetched Surf Spot: ${data.nom}`)})
    
    //return this.http.get<DetailSpot>(url);
    
    ;
    
    // pipe(
    //   tap(() => this.log(`fetched spot id=${id}`)),
    //   catchError(() => this.handleError(`getSpot id= ${id}`))
    // );
  }

  updateSpot(spot: DetailSpot): Observable<DetailSpot> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    const putUrl = `${this.spotsUrl}/${spot.id}`; 

    return this.http.put(putUrl, spot, httpOptions)
    .pipe(
      tap(() => this.log(`Updated spot id=${spot.id}`)),
      catchError(this.handleError<any>(`UpdatedSpot`))
    );
  }
  //Avec les Observables typés, on doit déclarer la méthode CatchError.

  deleteSpot (spot: DetailSpot): Observable<DetailSpot> {
    const url = `${this.spotsUrl}/${spot.id}`;
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}) 
    };

    return this.http.delete<DetailSpot>(url, httpOptions).pipe(
      tap(()=> this.log(`Deleted Spot id = ${spot.id}, name = ${spot.nom}`)),
      catchError(this.handleError<DetailSpot>('deleteSpot'))
    );

  }

  searchSpot(term: string): Observable<DetailSpot[]> {
		if (!term.trim()) {
			// si le terme de recherche n'existe pas, on renvoie un tableau vide.
			return of([]);
		}
    console.log(this.http.get<DetailSpot[]>(`${this.spotsUrl}?nom=${term}`));
		return this.http.get<DetailSpot[]>(`${this.spotsUrl}?nom=${term}`).pipe(
			tap(_ => this.log(`found DetailSpots matching "${term}"`)),
			catchError(this.handleError<DetailSpot[]>('searchDetailSpots', []))
		);
	}

  geoLocate() { 

    if(localStorage.getItem('lat') && localStorage.getItem('long')) {
      console.log("Tentative de récupération des données de la Session -> Lat: " + +localStorage.getItem('lat') + " long: " + +localStorage.getItem('long'));
      this.lat = +localStorage.getItem('lat');
      this.long = +localStorage.getItem('long');
      this.origin = { lat: this.lat, long: this.long};
      console.log("Coordonnées récupérées de la Session -> Lat:" + this.origin.lat + " long: " + this.origin.long);
      return this.origin;
    } else 
    {
      if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.long = position.coords.longitude;
        this.zoom = 16;
        this.origin = { lat: this.lat, long: this.long};
        localStorage.setItem('lat', this.origin.lat);
        localStorage.setItem('long', this.origin.long);
      });
      return this.origin;
      }
      else {
        alert("Your Browser does not support geolocation.")
      }
    }
  }

    getMswUrl(id: number): void {
      console.log(`${this.mswUrl}/${this.mswApiKey}/forecast/?spot_id=${id}/${this.mswUrlParameters}`); // TODO a delete
    }

    //TODO: Détailler le mapping du résultat de la raqupete JSON à chaque élément de l'objet MagicSeaWeedDetailSpot
  getSurfSpotInfoMagicSeaWeed(id: number): Observable<MagicSeaWeedDetailSpotTest[]> { // TODO je suis parti sur une classe de test qui ne marche pas, il faudra changer pour la classe normale
    // const mswApiKey = this.params.getMagicSeaWeedApiKey();
    const url = `${this.mswUrl}/${this.mswApiKey}/forecast/?spot_id=${id}/${this.mswUrlParameters}`;
    console.log("méthode getSurfSpotInfoMagicSeaWeed: url = " + url);
    let mswData = MagicSeaWeedDetailSpotTest;
    console.log(this.http.get<any>(url));
    return this.http.get<MagicSeaWeedDetailSpotTest[]>(url).pipe(
      tap(() => this.log(`fetched msw data id=${id}`)),
      catchError(() => this.handleError<MagicSeaWeedDetailSpot[]>(`getMswData id= ${id}`, []))
    );
  }

    	/* log */
	private log(log: string) {
		console.info(log);
  }
  
  	/* handleError */
	private handleError<T>(operation: String , result?: T) { //?: veut dire optionnel, on type le retour si on veut
		return (error: any): Observable<T> => {
			console.error(error);
			console.log(`${operation} failed: ${error.message}`);

			return of(result as T);//'of' --> transforme les données passées en paramètre en un Observable
		};
    } 
	
	  //param 'operation' est le nom de la méthode qui a causé l'erreur, result est une donnée facultative --->
	  // utile car result?: T permet à l'appli de toujours fonctionner en renvoyant un résultat adapté à la méthode qui
	  //a levé l'erreur. Genre si un DetailSpot[] est attendu pour la méthode GETspots, ça va renvoyer un objet de 
	  //ce type pour ne pas faire tout bugger
}
