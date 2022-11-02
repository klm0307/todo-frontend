import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { confirmPasswordValidator } from '../../../../shared/validators/confirm-password';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  formulario!: FormGroup;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const { token, email } = this.route.snapshot.params;

    this.token = token;
    this.formulario = this.fb.group(
      {
        email: this.fb.control<string>({
          value: email,
          disabled: true,
        }),
        password: this.fb.control<string>(
          {
            value: '',
            disabled: false,
          },
          [Validators.required, Validators.minLength(8)]
        ),
        confirmPassword: this.fb.control<string>(
          {
            value: '',
            disabled: false,
          },
          [Validators.required, Validators.minLength(8)]
        ),
      },
      { validators: [confirmPasswordValidator()] }
    );
  }

  formIsValid(): boolean {
    return this.formulario.valid;
  }

  changePassword() {
    if (this.formIsValid()) {
      this.authService
        .changePassword({
          token: this.token,
          newPassword: this.formulario.get('confirmPassword')?.value,
        })
        .subscribe({
          next: () => {
            this.toastr.success('La contraseña se cambio con éxito.');
            this.router.navigate(['/auth/login']);
          },
          error: (error: string) => {
            this.toastr.error(error);
          },
        });
    }
  }
}
