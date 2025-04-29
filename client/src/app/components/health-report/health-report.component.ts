import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PatientsService } from '../../services/patients/patients.service';
import { AlertService } from '../../services/alerts/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-health-report',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './health-report.component.html',
  styleUrl: './health-report.component.css',
})
export class HealthReportComponent {
  reportForm!: FormGroup;

  symptoms = {
    values: [
      {
        name: 'Chest Pain',
        values: [
          { name: 'High Blood Presure' },
          { name: 'Cholesterol', values: [{ name: 'High' }, { name: 'Low' }] },
        ],
      },
      { name: 'High Heart Rate' },
    ],
  };

  secondDropdownOptions: any[] = [];
  thirdDropdownOption: any[] = [];

  constructor(
    private fb: FormBuilder,
    private patients_service: PatientsService,
    private alert_service: AlertService
  ) {
    this.reportForm = this.fb.group({ symptom: null });
  }

  onSymptomReportChange(
    selectedOption: { name: string; values?: any },
    field: string
  ) {
    if (field === 'symptom') {
      if (this.reportForm.get(field)) {
        this.resetForm();
      }
      if (selectedOption.values) {
        this.reportForm.addControl('detail', this.fb.control(null));
      }
      this.secondDropdownOptions = selectedOption.values || [];
    }

    if (field === 'detail') {
      if (this.reportForm.get(field)) {
        this.reportForm.removeControl('level');
      }

      if (selectedOption.values) {
        this.reportForm.addControl('level', this.fb.control(null));
      }
      this.thirdDropdownOption = selectedOption.values || [];
    }

    this.reportForm.patchValue({ [field]: selectedOption.name });
  }

  validReportForm(): boolean {
    return Object.values(this.reportForm.value).every((val) => val);
  }

  onReportSubmit() {
    const validForm = this.validReportForm();

    if (validForm) {
      this.patients_service.submitReport(this.reportForm.value).subscribe({
        next: (res) => {
          const { message } = res;
          this.alert_service.successAlert(message, 2000);
        },
        error: (err) => {
          this.alert_service.errorAlert(err, 2000);
        },
      });
    }
  }

  private resetForm(): void {
    Object.keys(this.reportForm.controls).forEach((key) => {
      this.reportForm.removeControl(key);
    });
    this.reportForm.addControl('symptom', this.fb.control(null));
    this.thirdDropdownOption = [];
  }
}
