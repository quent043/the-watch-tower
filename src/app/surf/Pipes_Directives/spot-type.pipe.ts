import { Pipe, PipeTransform } from '@angular/core';
  
/*
 * Affiche un thème correspondant au type de spot de surf.
 * Prend en argument le type du spot.
 * Exemple d'utilisation:
 *   {{ detailSpot.type | surfSpotTypeColor }}
*/
@Pipe({name: 'surfSpotTypeColor'})
export class SurfSpotTypeColorPipe implements PipeTransform {
  transform(type: string): string {
  
    let color: string;
  
    switch (type) {
      case 'Beach Break':
        color = 'blue lighten-1';
        break;
      case 'Reef':
        color = 'red lighten-1';
        break;
      default:
        color = 'grey';
        break;
    }
  
    return 'background ' + color;
  
  }
}