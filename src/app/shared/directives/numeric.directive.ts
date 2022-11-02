import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[numeric]',
})
export class NumericDirective {
  constructor(private ref: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event) {
    const initialValue = this.ref.nativeElement.value;
    const newValue = initialValue.replace(/[^0-9]*/g, '');
    this.ref.nativeElement.value = newValue;

    if (initialValue !== this.ref.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
