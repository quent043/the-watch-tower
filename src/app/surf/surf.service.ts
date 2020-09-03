import { Injectable } from '@angular/core';
import { SURF_SPOTS } from './mock-surf-spots';
import { DetailSpot } from './detail-spot';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ParamsService } from '../params.service';
import { MagicSeaWeedDetailSpot } from './magicseaweed-spot';
import { MagicSeaWeedDetailSpotTest } from './magicseaweed-spot-test';
import { JsonPipe } from '@angular/common';

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
  // private mswUrl = 'http://magicseaweed.com/api'; ----> config proxy: /msw == http://magicseaweed.com maintenant
  private mswUrl = 'api';
  // private mswUrlParameters = '&units=eu&fields=localTimestamp,swell.unit,swell.components.*,wind.*,condition.*';
  private mswUrlParameters = '&units=eu&fields=localTimestamp';
  private mswApiKey = this.params.getMagicSeaWeedApiKey();

  getSurfSpots(): Observable<DetailSpot[]> {
    const url = `${this.spotsUrl}/getAll`;
    console.log("méthode getSurfSpots(), résultat de requête get: " + this.http.get<DetailSpot[]>(url))

    this.http.get<DetailSpot[]>(url).toPromise()
    .then(data => console.log(data));


    return this.http.get<DetailSpot[]>(url).pipe(
      tap(data => this.log(`Observable: fetched spot: ${JSON.stringify(data)}`)),
      tap(data => this.log(`Observable: fetched spot: ${JSON.stringify(data)}`)),
      catchError(this.handleError(`get Spots`, []))
    );
                                                      
  }

  getSurfSpot(id: number): Promise<DetailSpot> {
    const url = `${this.spotsUrl}/${id}`;
    console.log(`méthode getSurfSpot(${id})`)
    return this.http.get<DetailSpot>(url).toPromise();
  }

  // getSurfSpotInfoMagicSeaWeed(id: number): Observable<MagicSeaWeedDetailSpotTest[]> {
    getSurfSpotInfoMagicSeaWeed(id: number): Observable<any> {
    this.mswUrlParameters = '&units=eu';
    const url = `${this.mswUrl}/${this.mswApiKey}/forecast/?spot_id=${id}/${this.mswUrlParameters}`;
    const httpOptions = {
      headers: new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
      .set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
    };
    //   {'Access-Control-Allow-Origin':'*'},
    //   {'Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'},
    //   {'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'};
    //   )
    // };

    console.log("méthode getSurfSpotInfoMagicSeaWeed: url = " + url);
    // let mswData = MagicSeaWeedDetailSpot;
    // console.log(this.http.get<any>(url, httpOptions).toPromise());
    // return this.http.get<MagicSeaWeedDetailSpotTest[]>(url, httpOptions).pipe(
    //   tap(() => this.log(`fetched msw data id=${id}`)),
    //   catchError(() => this.handleError<MagicSeaWeedDetailSpotTest[]>(`getMswData id= ${id}`, []))
    // );
    return this.http.jsonp(url, 'callback').pipe(
      tap(() => this.log(`fetched msw data id=${id}`))
      // catchError(() => this.handleError<MagicSeaWeedDetailSpotTest[]>("msw sa race()", []))
    );
  }

  updateSpot(spot: DetailSpot): Observable<DetailSpot> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    const putUrl = `${this.spotsUrl}/${spot.id}`; 

    return this.http.put(putUrl, spot, httpOptions).pipe(
      tap(() => this.log(`Updated spot id=${spot.id}`)),
      tap(() => console.log(spot)),
      catchError(this.handleError<any>(`UpdatedSpot`))
    );
  }
  //Avec les Observables typés, on doit déclarer la méthode CatchError qui renvoie une
  //objet du type de l'Observable pour ne pas faire buggger l'appli.

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

    	/* log */
	private log(log: string) {
		console.info(log);
  }
  
  	/* handleError */
	private handleError<T>(operation: String , result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			console.log(`${operation} failed: ${error.message}`);

			return of(result as T);
		};
    } 

  //   /* handleErrorPromise */
	// private handleErrorPromise<T>(operation: String , result?: T) { //?: veut dire optionnel, on type le retour si on veut
	// 	return (error: any): Promise<T> => {
	// 		console.error(error);
	// 		console.log(`${operation} failed: ${error.message}`);

	// 		return (result);
	// 	};
  //   } 
	
	  //param 'operation' est le nom de la méthode qui a causé l'erreur, result est une donnée facultative --->
	  // utile car result?: T permet à l'appli de toujours fonctionner en renvoyant un résultat adapté à la méthode qui
	  //a levé l'erreur. Genre si un DetailSpot[] est attendu pour la méthode GETspots, ça va renvoyer un objet de 
	  //ce type pour ne pas faire tout bugger
}
