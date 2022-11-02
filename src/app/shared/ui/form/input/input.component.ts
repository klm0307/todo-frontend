import { Component, forwardRef, Input, OnInit, Self } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

export type InputType = 'text' | 'number' | 'email';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() type!: InputType;
  @Input() styleClass = '';
  value = '';
  disabled = false;
  onChange: any = () => {};
  onTouched: any = () => {};
  onValidationChange: any = () => {};
  control!: AbstractControl;

  constructor() {}

  ngOnInit(): void {}

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    this.control = control;
    return null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.onValidationChange = fn;
  }

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  onInput(event: any) {
    const { value } = event.target;
    this.value = value;
    this.onTouched();
    this.onChange(this.value);
  }

  get isValid(): boolean {
    return this.control && this.control.touched && this.control.dirty
      ? this.control.valid
      : true;
  }
}
