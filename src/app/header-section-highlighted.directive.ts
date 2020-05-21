import { Directive, Input, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: '[highlightHeaderSection]'
})
export class HeaderHighlightDirective {
    constructor(private el: ElementRef) {
        this.setColor(this.defaultColor);
        this.setFontSize(this.defaultFontSize);
    }

    @HostListener('click') onClick() {
        this.setColor(this.selectedColor);
        this.setFontSize(this.selectedFontSize);
    }

    @HostListener('blur') onBlur() {
        this.setColor(this.defaultColor);
        this.setFontSize(this.defaultFontSize);
    }

    private defaultColor: string = "#bfbfbf";
	private selectedColor: string = '#ffffff';
    private defaultFontSize: number = 8;
    private selectedFontSize: number = 12;
    

    private setColor(color : String) {
        this.el.nativeElement.style.color = color;
    }

    private setFontSize(size : number) {
        this.el.nativeElement.style.fontsize = size;  
    }
}