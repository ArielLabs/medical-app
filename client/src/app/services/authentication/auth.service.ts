import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { environment } from '../../../environment';
import { BehaviorSubject, Observable } from 'rxjs';

const SERVER_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean | null>(null);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(user: User): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${SERVER_URL}/auth/login`,
      user,
      {
        withCredentials: true,
      }
    );
  }

  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${SERVER_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  checkAuth(): Observable<{ message: boolean }> {
    return this.http.get<{ message: boolean }>(`${SERVER_URL}/auth/validate`, {
      withCredentials: true,
    });
  }

  getAuthStatus(): boolean {
    return this.isAuthenticatedSubject.value === true;
  }

  setAuthStatus(status: boolean): void {
    this.isAuthenticatedSubject.next(status);
  }
}
