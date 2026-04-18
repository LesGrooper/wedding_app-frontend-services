// ============================================================
// API Models — exact match to backend FastAPI schemas
// ============================================================

// ---- Auth ----
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

// ---- Guest ----
export type GuestCategory = 'VIP' | 'REGULAR';
export type InvitationType = 'QR' | 'PHYSICAL';

export interface Guest {
  id: number;
  name: string;
  phone: string | null;
  category: GuestCategory;
  invitation_type: InvitationType;
  is_checked_in: boolean;
  checked_in_at: string | null;
  qr_token: string | null;
  created_at: string;
}

export interface GuestListResponse {
  data: Guest[];
  total: number;
}

// ---- RSVP ----
export type AttendanceStatus = 'YES' | 'NO';

export interface RsvpRequest {
  name: string;
  phone: string;
  attendance: AttendanceStatus;
  guest_count: number;
}

export interface RsvpResponse {
  message: string;
  data: {
    id: number;
    name: string;
    attendance: AttendanceStatus;
    guest_count: number;
  };
}

// ---- Comment ----
export interface CommentRequest {
  name: string;
  message: string;
}

export interface Comment {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export interface CommentListResponse {
  data: Comment[];
  total: number;
}

// ---- Check-in ----
export type CheckInStatus = 'OK' | 'ALREADY_USED' | 'INVALID';
export type EntitlementType = 'FOOD' | 'SOUVENIR';

export interface Entitlement {
  type: EntitlementType;
}

export interface CheckInRequest {
  qr_token: string;
}

export interface CheckInResponse {
  status: CheckInStatus;
  message: string;
  data: CheckInData | null;
}

export interface CheckInData {
  guest_id: number;
  name: string;
  category: GuestCategory;
  entitlements: EntitlementType[];
}

// ---- API Error ----
export interface ApiError {
  detail: string | ValidationError[];
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}
