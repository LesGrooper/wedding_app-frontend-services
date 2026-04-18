import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {

  loginForm: FormGroup;
  loading = false;
  errorMsg = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/wo/dashboard']);
      },
      error: (err: any) => {
        this.loading = false;
        if (err?.status === 401 || err?.status === 400) {
          this.errorMsg = 'Username atau password salah.';
        } else {
          this.errorMsg = 'Terjadi kesalahan. Coba lagi.';
        }
      },
    });
  }

  fieldInvalid(field: string): boolean {
    const ctrl = this.loginForm.get(field);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }
}
