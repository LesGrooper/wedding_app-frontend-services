import { Component } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { Guest, CheckInResponse, GuestListResponse } from 'src/app/Models/api.model';

@Component({
  selector: 'app-manual-search-page',
  templateUrl: './manual-search-page.component.html',
  styleUrls: ['./manual-search-page.component.scss'],
})
export class ManualSearchPageComponent {

  searchQuery = '';
  guests: any = [];
  searching = false;
  searchError = '';

  checkinResult: CheckInResponse | null = null;
  checkinLoading: number | null = null; // guest id being checked in

  private search$ = new Subject<string>();

  constructor(private apiService: ApiService) {
    this.search$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((q) => {
          this.searching = true;
          this.searchError = '';
          return this.apiService.getGuests(q);
        }),
      )
      .subscribe({
        next: (res: GuestListResponse) => {
          this.guests = res;
          this.searching = false;
        },
        error: () => {
          this.searchError = 'Gagal mencari tamu.';
          this.searching = false;
        },
      });
  }

  onSearchChange(): void {
    if (this.searchQuery.trim().length >= 2) {
      this.search$.next(this.searchQuery.trim());
    } else {
      this.guests = [];
    }
  }

  checkIn(guest: Guest): void {
    if (!guest.qr_token) {
      this.checkinResult = {
        status: 'INVALID',
        message: 'Tamu ini tidak memiliki QR token.',
        data: null,
      };
      return;
    }

    this.checkinLoading = guest.id;
    this.checkinResult = null;

    this.apiService.checkIn({ qr_token: guest.qr_token }).subscribe({
      next: (res: CheckInResponse) => {
        this.checkinResult = res;
        this.checkinLoading = null;
        // Mark guest as checked-in locally
        const found = this.guests.find((g : any) => g.id === guest.id);
        if (found && res.status === 'OK') {
          found.is_checked_in = true;
        }
      },
      error: (err: any) => {
        this.checkinLoading = null;
        this.checkinResult = {
          status: 'INVALID',
          message: err?.error?.detail || 'Terjadi kesalahan.',
          data: null,
        };
      },
    });
  }

  dismissResult(): void {
    this.checkinResult = null;
  }

  get resultClass(): string {
    switch (this.checkinResult?.status) {
      case 'OK': return 'result-toast--ok';
      case 'ALREADY_USED': return 'result-toast--used';
      case 'INVALID': return 'result-toast--invalid';
      default: return '';
    }
  }
}
