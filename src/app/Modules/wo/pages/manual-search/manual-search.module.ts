import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ManualSearchRoutingModule } from './manual-search-routing.module';
import { ManualSearchPageComponent } from './manual-search-page.component';

@NgModule({
  declarations: [ManualSearchPageComponent],
  imports: [CommonModule, FormsModule, RouterModule, ManualSearchRoutingModule],
})
export class ManualSearchModule { }
