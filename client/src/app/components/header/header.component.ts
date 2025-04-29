import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/authentication/auth.service';
import { AlertService } from '../../services/alerts/alert.service';

@Component({
  selector: 'app-header',
  imports: [MaterialModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private auth_service: AuthService,
    private alert_service: AlertService,
    private router: Router
  ) {}

  logout() {
    this.auth_service.logout().subscribe({
      next: (res) => {
        this.auth_service.setAuthStatus(false);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.alert_service.errorAlert(err, 2000);
      },
    });
  }
}
