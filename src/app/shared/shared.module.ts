import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './ui/form/input/input.component';
import { InputPasswordComponent } from './ui/form/input-password/input-password.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from './ui/button/button.component';
import { ErrorMessageContainerDirective } from './directives/form-error/directive/error-message-container.directive';
import { ErrorMessageSubmitDirective } from './directives/form-error/directive/error-message-submit.directive';
import { ErrorMessageDirective } from './directives/form-error/directive/error-message.directive';
import { SidebarComponent } from './ui/sidebar/sidebar.component';

@NgModule({
  declarations: [
    InputComponent,
    InputPasswordComponent,
    ButtonComponent,
    SidebarComponent,
    ErrorMessageContainerDirective,
    ErrorMessageSubmitDirective,
    ErrorMessageDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularSvgIconModule,
  ],
  providers: [],
  exports: [
    InputComponent,
    FormsModule,
    InputPasswordComponent,
    ButtonComponent,
    SidebarComponent,
    ReactiveFormsModule,
    AngularSvgIconModule,
    ErrorMessageContainerDirective,
    ErrorMessageSubmitDirective,
    ErrorMessageDirective,
  ],
})
export class SharedModule {}
