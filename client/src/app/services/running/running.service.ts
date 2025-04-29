import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { Observable } from 'rxjs';

const SERVER_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class RunningService {
  constructor(private http: HttpClient) {}

  uploadRunningFile(
    formData: FormData
  ): Observable<HttpEvent<{ message: string }>> {
    return this.http.post<{ message: string }>(
      `${SERVER_URL}/running/upload`,
      formData,
      {
        withCredentials: true,
        reportProgress: true,
        observe: 'events',
      }
    );
  }

  downloadRunningFile(filename: string): Observable<Blob> {
    return this.http.get(`${SERVER_URL}/running/download/${filename}`, {
      withCredentials: true,
      responseType: 'blob',
    });
  }
}
