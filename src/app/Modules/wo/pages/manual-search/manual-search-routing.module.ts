import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManualSearchPageComponent } from './manual-search-page.component';

const routes: Routes = [{ path: '', component: ManualSearchPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManualSearchRoutingModule { }
