import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureRoutingModule } from './feature-routing.module';
import { AuthComponent } from './auth/auth.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, FeatureRoutingModule, AngularSvgIconModule],
  exports: [],
})
export class FeatureModule {}
