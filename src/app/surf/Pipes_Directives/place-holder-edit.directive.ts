import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appPlaceHolderEdit]'
})
export class PlaceHolderEditDirective {

  private textOnFocus: String = '';
  private textOnBlur: String = this.el.nativeElement.placeholder;

  constructor(private el: ElementRef) {
    this.setPlaceholder(this.textOnBlur);
   }

   @HostListener('focus') onFocus() {
     console.log(this.el.nativeElement.placeholder);
     this.textOnBlur= this.el.nativeElement.placeholder;
     this.setPlaceholder(this.textOnFocus);
   }

   @HostListener('blur') onBlur() {
    console.log(this.el.nativeElement.placeholder);
    this.setPlaceholder(this.textOnBlur);
  }

   private setPlaceholder (content: String) {
     this.el.nativeElement.placeholder = content;
   }

}
