import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPasswordComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: InputPasswordComponent,
      multi: true,
    },
  ],
})
export class InputPasswordComponent
  implements OnInit, ControlValueAccessor, Validator
{
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() styleClass = '';
  type = 'password';
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

  get isPassword(): boolean {
    return this.type === 'password';
  }

  get isValid(): boolean {
    return this.control && this.control.touched && this.control.dirty
      ? this.control.valid
      : true;
  }

  handleButtonClick() {
    this.type = this.isPassword ? 'text' : 'password';
  }

  onInput(event: any) {
    const { value } = event.target;
    this.value = value;
    this.onTouched();
    this.onChange(this.value);
  }
}
