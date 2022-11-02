import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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
      password: this.fb.control<string>(
        {
          value: '',
          disabled: false,
        },
        [Validators.required]
      ),
    });
  }

  handleSignUpButton() {
    this.router.navigateByUrl('/auth/register');
  }

  handleLoginButton() {
    if (this.formulario.valid) {
      this.authService.login(this.formulario.value).subscribe({
        next: (data) => {
          sessionStorage.setItem('token', data.token);
          this.toastr.success('Inicio de sesión exitoso.');
          this.router.navigate(['/todo/list']);
        },
        error: (error: string) => {
          this.toastr.error(error);
        },
      });
    }
  }

  formIsValid(): boolean {
    return this.formulario.valid;
  }
}
