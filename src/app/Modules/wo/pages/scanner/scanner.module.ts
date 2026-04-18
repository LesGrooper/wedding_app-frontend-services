import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ScannerRoutingModule } from './scanner-routing.module';
import { ScannerPageComponent } from './scanner-page.component';

@NgModule({
  declarations: [ScannerPageComponent],
  imports: [CommonModule, FormsModule, RouterModule, ScannerRoutingModule],
})
export class ScannerModule { }
