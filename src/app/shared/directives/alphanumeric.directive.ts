import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[alphanumeric]',
})
export class AlphanumericDirective {
  constructor(private ref: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event) {
    const initialValue = this.ref.nativeElement.value;
    const newValue = initialValue.replace(/[^a-zA-Z0-9-]*/g, '');
    this.ref.nativeElement.value = newValue;

    if (initialValue !== this.ref.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
