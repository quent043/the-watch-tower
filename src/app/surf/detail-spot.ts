export class DetailSpot {
        id: number;
        nom: string;
        houle: number;
        orientation: string;
        hauteurSaturation: number;
        type: string;
        region: string;
        isSelected: boolean = false;

        constructor (id, nom, houle, orientation, hauteurSaturation, type, region) {
          this.id = id;
          this.nom = nom;
          this.houle = houle;
          this.orientation = orientation;
          this.hauteurSaturation = hauteurSaturation;
          this.type = type;
          this.region = region;
          this.isSelected = false;
        }
      } 
