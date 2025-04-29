import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { AlertService } from '../../services/alerts/alert.service';
import { RunningService } from '../../services/running/running.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-running-history',
  imports: [MaterialModule],
  templateUrl: './running-history.component.html',
  styleUrl: './running-history.component.css',
})
export class RunningHistoryComponent {
  file: File | null = null;
  isDragOver = false;
  uploadProgress: number = 0;
  isUploading: boolean = false;
  jsonFilename: string | null = null;

  constructor(
    private running_service: RunningService,
    private alert_service: AlertService
  ) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    if (event.dataTransfer?.files.length) {
      this.validateAndSetFile(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
      this.validateAndSetFile(target.files[0]);
    }
  }

  onUpload(): void {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);
      this.isUploading = true;
      this.running_service.uploadRunningFile(formData).subscribe({
        next: (event: HttpEvent<{ message: string }>) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total) {
              this.uploadProgress = Math.round(
                100 * (event.loaded / event.total)
              );
            }
          } else if (event.type === HttpEventType.Response) {
            this.isUploading = false;
            this.jsonFilename = event.body?.message ?? null;
          }
        },
        error: (err) => {
          this.isUploading = false;
          this.alert_service.errorAlert(err, 2500);
        },
      });
    }
  }

  onDownload(): void {
    if (this.jsonFilename) {
      this.running_service.downloadRunningFile(this.jsonFilename).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = this.file!.name.replace('.csv', '.json');
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          this.alert_service.errorAlert(err, 2500);
        },
      });
    }
  }

  onCancel(): void {
    this.file = null;
    this.jsonFilename = null;
    this.isUploading = false;
  }

  private validateAndSetFile(file: File) {
    const validateFile = this.isCsvFile(file);
    if (validateFile) {
      this.file = file;
    } else {
      this.alert_service.errorAlert('Only CSV files are allowed.', 3000);
    }
  }

  private isCsvFile(file: File): boolean {
    const fileName = file.name.toLowerCase();
    const fileType = file.type;
    return (
      fileName.endsWith('.csv') && (fileType === 'text/csv' || fileType === '')
    );
  }
}
