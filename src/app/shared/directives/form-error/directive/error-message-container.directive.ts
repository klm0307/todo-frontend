import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[validate]',
})
export class ErrorMessageContainerDirective {
  constructor(public vcr: ViewContainerRef) {}
}
