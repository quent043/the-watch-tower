import { Injectable } from '@angular/core';
import { SURF_SPOTS } from './mock-surf-spots';
import { DetailSpot } from './detail-spot';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ParamsService } from '../params.service';
import { MagicSeaWeedDetailSpot } from './magicseaweed-spot';
import { MagicSeaWeedDetailSpotTest } from './magicseaweed-spot-test';

@Injectable({       //Injectable ---> Contribue à l'injection de dépendances dans d'autres modules.
  providedIn: 'root'
})
export class SurfService {

  lat: Number;
  long: Number;
  private zoom: Number;
  origin;
  destination;

  constructor(
    private http: HttpClient, // ----> Va renvoyer un Json. Attention, ce n'est pas toujours le cas dans d'autres API.
    private params: ParamsService
  ) { }

  private spotsUrl = 'api/spots'; //Point d'accès vers l'API. Fictive pour l'instant.
  private mswUrl = 'http://magicseaweed.com/api';
  // private mswUrlParameters = '&units=eu&fields=localTimestamp,swell.unit,swell.components.*,wind.*,condition.*';
  private mswUrlParameters = '&units=eu&fields=localTimestamp';
  private mswApiKey = this.params.getMagicSeaWeedApiKey();

  getSurfSpots(): Observable<DetailSpot[]> {
    console.log("méthode getSurfSpots(), résultat de requête get: " + this.http.get<DetailSpot[]>(this.spotsUrl))
    return this.http.get<DetailSpot[]>(this.spotsUrl).pipe(  // méthode HttpClient.get<DetailSpots[]> retourne un Obersvable qui retourne un tableau de spots
      tap(_ => this.log(`fetched spot`)),                   // sur la route 'api/spots'.
      catchError(this.handleError(`get Spots`, []))   //Puis on va effectuer 2 opérations sur les données de retour.
    );                                                //tap effectue une action quelconque (debug etc.)
                                                      //catchError interagit en interceptant les erreurs
  }

  getSurfSpot(id: number): Observable<DetailSpot> {
    const url = `${this.spotsUrl}/${id}`;
    console.log("méthode getSurfSpots(), résultat de requête get: " + this.http.get<DetailSpot>(url))
    return this.http.get<DetailSpot>(url).pipe(
      tap(() => this.log(`fetched spot id=${id}`)),
      catchError(() => this.handleError(`getSpot id= ${id}`))
    );
    // let surfSpots = this.getSurfSpots();
    // for (let i = 0; i < surfSpots.length; i++) {
    //   if (id === surfSpots[i].id) {
    //     return surfSpots[i];
    //   }
    // }
  }

  updateSpot(spot: DetailSpot): Observable<DetailSpot> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}) 
    };

    return this.http.put(this.spotsUrl, spot, httpOptions).pipe(
      tap(() => this.log(`Updated spot id=${spot.id}`)),
      catchError(this.handleError<any>(`UpdatedSpot`))
    );
  }

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
