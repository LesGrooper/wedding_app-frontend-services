import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from './RestApi/rest-api.service';
import {
  RsvpRequest,
  RsvpResponse,
  CommentRequest,
  Comment,
  CommentListResponse,
  CheckInRequest,
  CheckInResponse,
  GuestListResponse,
} from '../Models/api.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private restApi: RestApiService) {}

  // ---- RSVP ----
  submitRsvp(payload: RsvpRequest): Observable<RsvpResponse> {
    return this.restApi.post<RsvpResponse>('/rsvp', payload);
  }

  // ---- Comments ----
  submitComment(payload: CommentRequest): Observable<Comment> {
    return this.restApi.post<Comment>('/comments', payload);
  }

  getComments(): Observable<CommentListResponse> {
    return this.restApi.get<CommentListResponse>('/comments');
  }

  // ---- Check-In ----
  checkIn(payload: CheckInRequest): Observable<CheckInResponse> {
    return this.restApi.post<CheckInResponse>('/checkin', payload);
  }

  // ---- Guests (WO) ----
  getGuests(search?: string): Observable<GuestListResponse> {
    const params: Record<string, string> = {};
    if (search) {
      params['search'] = search;
    }
    return this.restApi.get<GuestListResponse>('/guests', params);
  }
}
