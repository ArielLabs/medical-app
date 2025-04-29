import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGaurdService implements CanActivate {
  constructor(private auth_service: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth_service.getAuthStatus()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
