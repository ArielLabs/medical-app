import { Component } from '@angular/core';
import { PatientsListComponent } from '../../components/patients-list/patients-list.component';
import { RunningHistoryComponent } from '../../components/running-history/running-history.component';
import { HealthReportComponent } from '../../components/health-report/health-report.component';

@Component({
  selector: 'app-home',
  imports: [
    PatientsListComponent,
    HealthReportComponent,
    RunningHistoryComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
