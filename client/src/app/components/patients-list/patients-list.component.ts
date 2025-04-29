import { Component, OnInit, viewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MaterialModule } from '../../shared/material/material.module';
import { PatientsService } from '../../services/patients/patients.service';
import { Patient } from '../../models/patient';
import { finalize } from 'rxjs';
import { AlertService } from '../../services/alerts/alert.service';

@Component({
  selector: 'app-patients-list',
  imports: [MaterialModule],
  templateUrl: './patients-list.component.html',
  styleUrl: './patients-list.component.css',
})
export class PatientsListComponent implements OnInit {
  patients: Patient[] = [];
  isLoading: boolean = false;
  isError: boolean = false;
  accordion = viewChild.required(MatAccordion);

  statusColorMapBMI = new Map<string, string>([
    ['Normal', 'green'],
    ['Overweight', 'orange'],
    ['Obesed', 'red'],
    ['Underweight', '#fdba74'],
  ]);

  constructor(private patients_service: PatientsService, private alert_service: AlertService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.patients_service
      .fetchPatients()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          const { message: dataPatients } = res;
          this.patients = dataPatients;
        },
        error: (err) => {
          this.isError = true;
          this.alert_service.errorAlert(err, 2000);
        },
      });
  }

  heightFormat(height: number): string {
    return (height / 100).toFixed(2);
  }

  calculateBMI(
    height: number,
    weight: number
  ): { bmi: number; status: string } {
    const bmi = Number((weight / Math.pow(height / 100, 2)).toFixed(2));
    let statusBmi = 'Normal';

    if (bmi <= 18.5) {
      statusBmi = 'Underweight';
    } else if (25 <= bmi && bmi <= 39.9) {
      statusBmi = 'Overweight';
    } else if (bmi >= 40) {
      statusBmi = 'Obesed';
    }

    return {
      bmi,
      status: statusBmi,
    };
  }

  getStatusColorBMI(status: string): string {
    return this.statusColorMapBMI.get(status) || 'black';
  }

  getAvgHeartRate(samples: string): string {
    const heartRate = samples.split(';');
    return (
      heartRate.reduce((acc, val) => acc + Number(val), 0) / heartRate.length
    ).toFixed(2);
  }

  getActivityStatus(samples: string): {
    mode: string;
    time: number;
  }[] {
    const heartRate = samples.split(';');
    const sleepingTime = heartRate.findIndex((sample) => Number(sample) < 70);
    const awakeTime = heartRate.findIndex(
      (sample) => Number(sample) >= 70 && Number(sample) < 90
    );
    const workoutTime = heartRate.findIndex((sample) => Number(sample) >= 90);

    const activites = [
      { mode: 'Sleeping', time: sleepingTime + 1 },
      { mode: 'Awake', time: awakeTime + 1 },
      { mode: 'Workout', time: workoutTime + 1 },
    ];

    return activites
      .filter((activity) => activity.time > 0)
      .sort((a, b) => a.time - b.time);
  }
}
