import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { confirmPasswordValidator } from 'src/app/shared/validators/confirm-password';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formulario!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group(
      {
        email: this.fb.control<string>(
          {
            value: '',
            disabled: false,
          },
          [Validators.required, Validators.email]
        ),
        password: this.fb.control<string>(
          {
            value: '',
            disabled: false,
          },
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(10),
          ]
        ),
        confirmPassword: this.fb.control<string>(
          {
            value: '',
            disabled: false,
          },
          [Validators.required, Validators.minLength(8)]
        ),
        name: this.fb.control<string>(
          {
            value: '',
            disabled: false,
          },
          [Validators.required]
        ),
      },
      { validators: [confirmPasswordValidator()] }
    );
  }

  handleLoginButton() {
    this.router.navigateByUrl('/auth/login');
  }

  formIsValid(): boolean {
    return this.formulario.valid;
  }

  register() {
    this.authService.register(this.formulario.value).subscribe({
      next: (data) => {
        this.toastr.success('Usuario registrado');
        this.router.navigate(['/auth/login']);
      },
      error: (error: string) => {
        this.toastr.error(error);
      },
    });
  }
}
