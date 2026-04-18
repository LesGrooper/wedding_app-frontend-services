import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { QRCodeComponent } from 'angularx-qrcode';

import { GuestRoutingModule } from './guest-routing.module';
import { InvitationPageComponent } from './pages/invitation/invitation-page.component';

@NgModule({
  declarations: [
    InvitationPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    QRCodeComponent,
    GuestRoutingModule,
  ],
})
export class GuestModule { }
