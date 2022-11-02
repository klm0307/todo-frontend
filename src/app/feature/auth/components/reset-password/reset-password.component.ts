import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  formulario!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      email: this.fb.control<string>(
        {
          value: '',
          disabled: false,
        },
        [Validators.required, Validators.email]
      ),
    });
  }

  handleLoginButton() {
    this.router.navigateByUrl('/auth/login');
  }

  formIsValid(): boolean {
    return this.formulario.valid;
  }

  resetPassword() {
    if (this.formIsValid()) {
      const email = this.formulario.get('email')!.value;
      this.authService.resetPassword(email).subscribe({
        next: (data) => {
          this.toastr.success(
            `Se envió un correo con instrucciones a la dirección ${email}`
          );
          this.router.navigate(['/auth/login']);
        },
        error: (error: string) => {
          this.toastr.error(error);
        },
      });
    }
  }
}
