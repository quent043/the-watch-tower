import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from 'querystring';
  
/*
 * Affiche une classe CSS correspondant au type de spot de surf.
 * Prend en argument le type du spot.
 * Les classes CSS doivent être déclarées dans le module correspondant.
 * Exemple d'utilisation:
 *   class = {{ detailSpot.type | surfSpotTypeColor }}
*/
@Pipe({name: 'surfSpotTypeColor'})
export class SurfSpotTypeColorPipe implements PipeTransform {
  transform(type: string): string {
  
    //let color: string;
    let colorCssClass: string;
  
    switch (type) {
      case 'Beach Break':
        //color = 'blue lighten-1';
        colorCssClass = "beach-break"
        break;
      case 'Reef':
        //color = 'red lighten-1';
        colorCssClass = "reef"
        break;
      case 'Point Break':
        //color = 'red lighten-1';
        colorCssClass = "point-break"
        break;
      default:
        colorCssClass = "default";
        break;
    }
  
    return colorCssClass;
  
  }
}