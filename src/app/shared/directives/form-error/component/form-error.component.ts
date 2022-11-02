import { Input } from '@angular/core';
import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent {
  errorMessagge!: string | null;
  hide = true;

  @Input()
  set text(value: string | null) {
    if (value !== this.errorMessagge) {
      this.errorMessagge = value;
      this.hide = !value;
      this.cdr.detectChanges();
    }
  }
  constructor(private cdr: ChangeDetectorRef) {}
}
