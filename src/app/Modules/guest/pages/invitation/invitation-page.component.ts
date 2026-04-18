import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, interval } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { Comment, AttendanceStatus, RsvpResponse, CommentListResponse } from 'src/app/Models/api.model';

@Component({
  selector: 'app-invitation-page',
  templateUrl: './invitation-page.component.html',
  styleUrls: ['./invitation-page.component.scss'],
})
export class InvitationPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('animSection') animSections!: QueryList<ElementRef>;

  isOpened = false;
  activeSection = 'hero';

  // RSVP
  rsvpForm!: FormGroup;
  rsvpLoading = false;
  rsvpSuccess = false;
  rsvpError = '';
  rsvpGuestQrToken: string | null = null;
  rsvpGuestName = '';

  // Comments
  commentForm!: FormGroup;
  commentLoading = false;
  commentSuccess = false;
  commentError = '';
  comments: Comment[] = [];
  commentsLoading = false;

  private commentPoll$!: Subscription;
  private observer!: IntersectionObserver;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.buildForms();
    this.startCommentPolling();
  }

  ngAfterViewInit(): void {
    this.initScrollAnimations();
  }

  ngOnDestroy(): void {
    this.commentPoll$?.unsubscribe();
    this.observer?.disconnect();
  }

  private buildForms(): void {
    this.rsvpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s]{8,20}$/)]],
      attendance: ['YES', Validators.required],
      guest_count: [1, [Validators.required, Validators.min(1), Validators.max(1)]],
    });

    this.commentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
    });
  }

  private startCommentPolling(): void {
    this.commentPoll$ = interval(15000).pipe(
      startWith(0),
      switchMap(() => this.apiService.getComments()),
    ).subscribe({
      next: (res) => {
        this.comments = [...res.data].reverse();
      },
    });
  }

  private initScrollAnimations(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 },
    );

    this.animSections.forEach((el) => this.observer.observe(el.nativeElement));
  }

  openInvitation(): void {
    this.isOpened = true;
    setTimeout(() => {
      document.getElementById('section-thankyou')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  setAttendance(val: AttendanceStatus): void {
    this.rsvpForm.patchValue({ attendance: val });
    if (val === 'NO') {
      this.rsvpForm.patchValue({ guest_count: 0 });
    } else {
      this.rsvpForm.patchValue({ guest_count: 1 });
    }
  }

  submitRsvp(): void {
    if (this.rsvpForm.invalid) {
      this.rsvpForm.markAllAsTouched();
      return;
    }

    this.rsvpLoading = true;
    this.rsvpError = '';

    this.apiService.submitRsvp(this.rsvpForm.value).subscribe({
      next: (res: RsvpResponse) => {
        this.rsvpLoading = false;
        this.rsvpSuccess = true;
        this.rsvpGuestName = res.data.name;
        this.rsvpGuestQrToken = res.data.id ? `${res.data.id}:rsvp` : null;
        this.rsvpForm.reset();
      },
      error: (err: any) => {
        this.rsvpLoading = false;
        this.rsvpError = this.extractError(err);
      },
    });
  }

  submitComment(): void {
    if (this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }

    this.commentLoading = true;
    this.commentError = '';

    this.apiService.submitComment(this.commentForm.value).subscribe({
      next: () => {
        this.commentLoading = false;
        this.commentSuccess = true;
        this.commentForm.reset();
        setTimeout(() => (this.commentSuccess = false), 3000);
        this.apiService.getComments().subscribe((res: CommentListResponse) => {
          this.comments = [...res.data].reverse();
        });
      },
      error: (err: any) => {
        this.commentLoading = false;
        this.commentError = this.extractError(err);
      },
    });
  }

  private extractError(err: any): string {
    if (err?.error?.detail) {
      if (typeof err.error.detail === 'string') {
        return err.error.detail;
      }
      if (Array.isArray(err.error.detail)) {
        return err.error.detail.map((e: any) => e.msg).join(', ');
      }
    }
    return 'Terjadi kesalahan. Silakan coba lagi.';
  }

  get rsvpAttendance(): string {
    return this.rsvpForm.get('attendance')?.value || 'YES';
  }

  fieldInvalid(form: FormGroup, field: string): boolean {
    const ctrl = form.get(field);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  }
}
