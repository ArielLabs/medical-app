import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../../models/patient';
import { Report } from '../../models/report';

const SERVER_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  constructor(private http: HttpClient) {}

  fetchPatients(): Observable<{ message: Patient[] }> {
    return this.http.get<{ message: Patient[] }>(`${SERVER_URL}/patients`, {
      withCredentials: true,
    });
  }

  submitReport(report: Report): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${SERVER_URL}/patients/report`,
      report,
      { withCredentials: true }
    );
  }
}
