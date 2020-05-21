import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
    selector: '[highlightTable]'
})
export class TableHighlightDirective {

    constructor(private el: ElementRef) {
        this.setColor(this.defaultColor);
        this.setFontSize(this.defaultFontSize);
        // this.setBorder('#0080ff');
    }

    @Input('highlightTable') fontColor: string;
    //Permet de sélectionner soi-même la couleur de la font

    @HostListener('mouseenter') onMouseEnter() {
        this.setColor(this.fontColor || this.selectedColor);
        this.setFontSize(this.selectedFontSize);
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.setColor(this.defaultColor);
        this.setFontSize(this.defaultFontSize);
    }

    private defaultColor: string = "#000000";
	private selectedColor: string = '#0080ff';
    private defaultFontSize: number = 8;
    private selectedFontSize: number = 12;
    

    private setColor(color : String) {
        this.el.nativeElement.style.color = color;
    }

    private setFontSize(size : number) {
        this.el.nativeElement.style.fontsize = size;  
    }

    // private setBorder(color: string) {
	// 	let border = 'solid 4px ' + color;
	// 	this.el.nativeElement.style.border = border;
	// }
    
}