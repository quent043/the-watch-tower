import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { DetailSpot } from '../detail-spot';
import { Router } from '@angular/router';
import { SurfService } from '../surf.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-spot-search',
  templateUrl: './spot-search.component.html',
  styleUrls: ['./spot-search.component.css']
})
export class SpotSearchComponent implements OnInit {

  private searchTerms = new Subject<string>();
  spots$: Observable<DetailSpot[]>; //Subject: classe de RXJS, hérite de Observable. Permet de stocker
  //des données dans un tableau de String sous la forme d'un Observable
  // avec cette notion de décallage dans le temps (asynchrone). 
  //le '$' c'est une convention pour montrer que c'est un flux

  constructor(
    private surfService: SurfService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.spots$ = this.searchTerms.pipe(
       // attendre 300ms de pause entre chaque requête
       debounceTime(300), //Met en pause l'execution de nouvelle requete tant qu'une nouvelle recherche a 
       //été lancée il y a moins de 300ms
       // ignorer la recherche en cours si c'est la même que la précédente
       distinctUntilChanged(),
       // on retourne la liste des résultats correpsondant aux termes de la recherche
       /*Cet opérateur annule et remplace les termes des précédentes recherche. En gros à chaque nouvelle valeur, 
       on obtient un nouvel Observable, '.switchMap' va unsubscribe de l'ancien et subscribe au nouveau.

       NB: l'opérateur '.mergeMap' aurait subscribe au nouveau tout en restant subscribed à l'ancien.*/
       switchMap((term: string) => this.surfService.searchSpot(term)),
    )
  }

  search(term:string): void {
    this.searchTerms.next(term); //searchTerms n'est pas un tableau mais un Subject, on utilise 'next' et non 'push'
    //Ici, à chaque fois qu'on appelle 'search', on ajoute au flux la donnée 'term'
  }

  /* Résumé: Dès qu'on rentre un caractère ça appelle 'search()', qui ajoute le caractère à 'searchTerms' 
   qui est un Subject, en gros un Observable qui récupère des String. Dès que la page recharge ça lance OnInit(),
   ici l'évènement 'keyup' la recharge. Dès qu'un terme est rentré ça appelle SurfService.searchSpot(term), 
   qui renvoie un Observable<DetailSpots[]> qu'on stocke dans l'Observable<DetailSpot[]> $spots
   qu'apparemment on peut lire directement sur du HTML. */

   gotoDetail(spot: DetailSpot): void {
    let link = ['/dashboard/detail-spot', spot.id];
    this.router.navigate(link);
}

}
