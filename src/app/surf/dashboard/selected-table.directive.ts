import { Directive, ElementRef, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
    selector: '[highlightTable]'
})
export class TableHighlightDirective {

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
        ) {
        this.setColor(this.defaultColor);
        // this.setFontWeight(this.defaultWeight);
        this.setBackgroundColor(this.defaultBackgroundColor);
        // this.setFontSize(this.defaultFontSize);
        // this.setBorder('#0080ff');
    }

    @Input('highlightTable') fontColor: string;
    //Permet de sélectionner soi-même la couleur de la font

    @HostListener('mouseenter') onMouseEnter() {
        this.setColor(this.fontColor || this.selectedColor);
        // this.setFontWeight(this.selectedWeight || this.defaultWeight);
        this.setBackgroundColor(this.selectedBackgroundColor || this.defaultBackgroundColor);
        // this.setFontSize(this.selectedFontSize || this.defaultFontSize);

    }

    @HostListener('mouseleave') onMouseLeave() {
        this.setColor(this.defaultColor);
        // this.setFontWeight(this.defaultWeight);
        this.setBackgroundColor(this.defaultBackgroundColor);
        // this.setFontSize(this.defaultFontSize);
    }

    private defaultColor: string = "#000000";
    private selectedColor: string = '#ffffff';
    private defaultWeight: string = 'normal';
    private selectedWeight: string = "bold";
    private defaultBackgroundColor: String = "#e6f5ff";
    private selectedBackgroundColor: String = "#80b3ff";

    // private defaultFontSize: number = 20;
    // private selectedFontSize: number = 25;
    

    private setColor(color : String) {
        this.renderer.setStyle(this.el.nativeElement, 'color', color);
        // this.el.nativeElement.style.color = color;
    }

    private setFontWeight (weight : String) {
        this.renderer.setStyle(this.el.nativeElement, 'font-weight', weight);
    }

    private setBackgroundColor (bgColog : String) {
        this.renderer.setStyle(this.el.nativeElement, 'background-color', bgColog);
    }

    // private setFontSize(size : number) {
    //     // this.el.nativeElement.style.fontsize = size;  
    //     this.renderer.setStyle(this.el.nativeElement, 'font-size', size + 'px');
    // }

    // private setBorder(color: string) {
	// 	let border = 'solid 4px ' + color;
	// 	this.el.nativeElement.style.border = border;
	// }
    
}