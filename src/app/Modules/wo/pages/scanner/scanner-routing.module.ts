import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScannerPageComponent } from './scanner-page.component';

const routes: Routes = [{ path: '', component: ScannerPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScannerRoutingModule { }
