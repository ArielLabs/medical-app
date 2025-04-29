import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/authentication/auth.service';
import { AlertService } from '../../services/alerts/alert.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword: boolean = true;

  isLocked: boolean = false;
  consecutiveFailures: number = 0;
  lockingTimer: number = 60;

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth_service: AuthService,
    private alert_service: AlertService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      Username: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  lockingLogin() {
    const timer = setInterval(() => {
      this.lockingTimer--;
      if (this.lockingTimer === 0) {
        this.isLocked = false;
        this.lockingTimer = 60;
        this.consecutiveFailures = 0;
        clearInterval(timer);
      }
    }, 1000);
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const user = this.loginForm.value;
      this.auth_service
        .login(user)
        .pipe(
          finalize(() => (this.isLoading = false))
        )
        .subscribe({
          next: (res) => {
            this.auth_service.setAuthStatus(true);
            this.router.navigate(['/home']);
          },
          error: (err) => {
            this.consecutiveFailures++;
            this.alert_service.errorAlert(err, 2000);
            if (this.consecutiveFailures === 3) {
              this.isLocked = true;
              this.lockingLogin();
            }
          },
        });
    }
  }
}
