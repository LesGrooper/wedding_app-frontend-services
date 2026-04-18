import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvitationPageComponent } from './pages/invitation/invitation-page.component';

const routes: Routes = [
  { path: '', component: InvitationPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestRoutingModule { }
