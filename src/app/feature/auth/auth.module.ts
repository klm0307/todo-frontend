import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';

import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    RegisterComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
  exports: [],
  providers: [AuthService],
})
export class AuthModule {}
