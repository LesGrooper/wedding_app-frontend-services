import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginPageComponent } from './login-page.component';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, ReactiveFormsModule, LoginRoutingModule],
})
export class LoginModule { }
