import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { AuthLayoutComponent } from './auth-layout.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {PasswordModule} from 'primeng/password';
import { LoginComponent } from 'src/app/pages/login/login.component';
import {ButtonModule} from 'primeng/button';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AuthLayoutComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthLayoutRoutingModule,
    InputTextModule,
    InputTextareaModule,
    PasswordModule,
    ButtonModule,
    TriStateCheckboxModule
  ]
})
export class AuthLayoutModule { }
