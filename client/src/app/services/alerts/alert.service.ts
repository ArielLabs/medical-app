import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private router: Router) {}

  successAlert(message: string, duration: number) {
    this.showAlert('Success', message, 'success', duration);
  }

  errorAlert(err: any, duration: number) {
    console.error(err);

    const message = err.error.message;
    const status = err.status;
    this.showAlert('Error', message, 'error', duration);

    if (status === 401) {
      this.router.navigate(['/login']);
    }
  }

  private showAlert(
    title: string,
    message: string,
    icon: 'success' | 'error',
    duration: number
  ): void {
    Swal.fire({
      title,
      text: message,
      icon,
      showConfirmButton: false,
      timer: duration,
      timerProgressBar: true,
    });
  }
}
