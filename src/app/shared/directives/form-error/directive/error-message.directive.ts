import {
  AfterViewChecked,
  ComponentRef,
  Directive,
  Host,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
} from '@angular/core';
import {
  AbstractControl,
  NgControl,
  NgModel,
  ValidatorFn,
} from '@angular/forms';
import { FormErrorComponent } from '../component/form-error.component';
import { ViewContainerRef } from '@angular/core';
import { Subscription, Observable, EMPTY, merge } from 'rxjs';
import { ErrorMessageContainerDirective } from './error-message-container.directive';
import { ErrorMessageSubmitDirective } from './error-message-submit.directive';
import { FORM_ERRORS } from '../errors/errors';

@Directive({
  selector: '[ngModel],[formControlName],[formControl]',
})
export class ErrorMessageDirective
  implements OnInit, OnDestroy, AfterViewChecked
{
  @Input() private errores: any = {};
  @Input() private initialValidation: boolean = false;
  @Input() private validations!: ValidatorFn[];

  private classErrorName = 'is-invalid';
  private component!: ComponentRef<FormErrorComponent>;
  private container!: ViewContainerRef | null;
  private state!: Subscription;
  private submit: Observable<Event>;

  constructor(
    public vcr: ViewContainerRef,
    @Optional() controlErrorContainer: ErrorMessageContainerDirective,
    @Optional() @Host() private form: ErrorMessageSubmitDirective,
    @Inject(FORM_ERRORS) private errors: any,
    private renderer: Renderer2,
    private control: NgControl
  ) {
    this.container = controlErrorContainer ? controlErrorContainer.vcr : null;
    this.submit = this.form ? this.form.submit : EMPTY;
  }

  ngOnInit(): void {
    this.addValidations();
    this.stateListener();
  }

  ngAfterViewChecked(): void {
    this.validateErrors();
  }

  ngOnDestroy(): void {
    this.state.unsubscribe();
  }

  private addValidations(): void {
    if (this.control instanceof NgModel && this.validations) {
      this.control.control.setValidators(this.validations);
    }
  }

  private get formControl(): AbstractControl | null {
    return this.control.control;
  }

  private printError(text: string | null = null): void {
    try {
      if (!this.component) {
        this.component = this.vcr.createComponent(FormErrorComponent);
      }
      this.component.instance.text = text;
      this.errorClass(true);
    } catch (error) {}
  }

  private errorClass(aplicarClase: boolean): void {
    if (this.container) {
      const contenedor = this.container.element.nativeElement;
      if (aplicarClase) {
        this.renderer.addClass(contenedor, this.classErrorName);
      } else {
        this.renderer.removeClass(contenedor, this.classErrorName);
      }
    }
  }

  private validateErrors(): void {
    try {
      if (this.formControl?.invalid && this.validateInitialState) {
        const primerValor: string = Object.keys(
          this.formControl.errors ?? {}
        )[0];
        const text =
          this.errores[primerValor] ||
          this.errors[primerValor](this.formControl.errors![primerValor]);

        this.printError(text);
        this.errorClass(true);
      } else {
        this.printError();
        this.errorClass(false);
      }
    } catch (error) {}
  }

  public get validateInitialState(): boolean {
    if (this.initialValidation) {
      return this.initialValidation;
    } else {
      return (this.formControl?.dirty || this.formControl?.touched) ?? false;
    }
  }

  private stateListener(): void {
    merge('', '');
    this.state = merge(this.submit, this.formControl!.valueChanges).subscribe(
      () => this.validateErrors()
    );
  }
}
