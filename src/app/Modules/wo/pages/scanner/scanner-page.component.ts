import { Component } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { CheckInResponse, CheckInStatus } from 'src/app/Models/api.model';

type ScanState = 'idle' | 'loading' | 'result';

@Component({
  selector: 'app-scanner-page',
  templateUrl: './scanner-page.component.html',
  styleUrls: ['./scanner-page.component.scss'],
})
export class ScannerPageComponent {

  qrInput = '';
  state: ScanState = 'idle';
  result: CheckInResponse | null = null;
  errorMsg = '';

  constructor(private apiService: ApiService) {}

  submitQr(): void {
    const token = this.qrInput.trim();
    if (!token) return;

    this.state = 'loading';
    this.errorMsg = '';
    this.result = null;

    this.apiService.checkIn({ qr_token: token }).subscribe({
      next: (res: CheckInResponse) => {
        this.result = res;
        this.state = 'result';
        this.qrInput = '';
      },
      error: (err: any) => {
        this.state = 'idle';
        this.errorMsg = err?.error?.detail || 'QR tidak valid atau terjadi kesalahan.';
      },
    });
  }

  reset(): void {
    this.state = 'idle';
    this.result = null;
    this.errorMsg = '';
    this.qrInput = '';
  }

  get resultStatus(): CheckInStatus | null {
    return this.result?.status ?? null;
  }

  get resultClass(): string {
    switch (this.result?.status) {
      case 'OK': return 'result--ok';
      case 'ALREADY_USED': return 'result--used';
      case 'INVALID': return 'result--invalid';
      default: return '';
    }
  }

  get resultIcon(): string {
    switch (this.result?.status) {
      case 'OK': return '✅';
      case 'ALREADY_USED': return '⚠️';
      case 'INVALID': return '❌';
      default: return '';
    }
  }

  get resultLabel(): string {
    switch (this.result?.status) {
      case 'OK': return 'Check-In Berhasil!';
      case 'ALREADY_USED': return 'Sudah Digunakan';
      case 'INVALID': return 'QR Tidak Valid';
      default: return '';
    }
  }

  hasEntitlement(type: 'FOOD' | 'SOUVENIR'): boolean {
    return this.result?.data?.entitlements?.includes(type) ?? false;
  }
}
