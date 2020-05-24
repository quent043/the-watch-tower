export class DetailSpot {
        id: number;
        nom: string;
        houle: number;
        orientationHoule: string;
        hauteurSaturation: number;
        type: string;
        region: string;
        maree: String;
        vent: String;
        directionVent: String;
        coordonnees: String;
        isSelected: boolean = false;

        constructor (id, nom, houle, orientationHoule, hauteurSaturation, type, region, maree, vent, directionVent, coordonnees) {
          this.id = id;
          this.nom = nom;
          this.houle = houle;
          this.orientationHoule = orientationHoule;
          this.hauteurSaturation = hauteurSaturation;
          this.type = type;
          this.region = region;
          this.maree = maree;
          this.vent = vent;
          this.directionVent = directionVent;
          this.coordonnees = coordonnees;
          this.isSelected = false;
        }
      } 
