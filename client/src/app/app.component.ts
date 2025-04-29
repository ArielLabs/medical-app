import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './services/authentication/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private auth_service: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth_service.checkAuth().subscribe({
      next: (res) => {
        const { message } = res;
        this.auth_service.setAuthStatus(message);
        if (message) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        this.auth_service.setAuthStatus(false);
        this.router.navigate(['/login']);
      },
    });
  }
}
