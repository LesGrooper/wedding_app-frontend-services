import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestListPageComponent } from './guest-list-page.component';

const routes: Routes = [{ path: '', component: GuestListPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestListRoutingModule { }
