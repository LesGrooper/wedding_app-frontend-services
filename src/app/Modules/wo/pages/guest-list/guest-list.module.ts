import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GuestListRoutingModule } from './guest-list-routing.module';
import { GuestListPageComponent } from './guest-list-page.component';

@NgModule({
  declarations: [GuestListPageComponent],
  imports: [CommonModule, FormsModule, RouterModule, GuestListRoutingModule],
})
export class GuestListModule { }
