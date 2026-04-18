import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { Guest, GuestListResponse } from 'src/app/Models/api.model';

@Component({
  selector: 'app-guest-list-page',
  templateUrl: './guest-list-page.component.html',
  styleUrls: ['./guest-list-page.component.scss'],
})
export class GuestListPageComponent implements OnInit {

  guests: any = [];
  loading = false;
  errorMsg = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadGuests();
  }

  loadGuests(): void {
    this.loading = true;
    this.errorMsg = '';

    this.apiService.getGuests().subscribe({
      next: (res: GuestListResponse) => {
        this.guests = res;
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = 'Gagal memuat data tamu.';
        this.loading = false;
      },
    });
  }

  logout(): void {
    this.authService.logout();
  }

  get checkedInCount(): number {
    return this.guests.filter((g : any) => g.is_checked_in).length;
  }

  get totalCount(): number {
    return this.guests.length;
  }
}
