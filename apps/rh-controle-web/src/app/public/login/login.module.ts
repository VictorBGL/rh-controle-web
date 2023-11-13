import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRouting } from './login.routing';
import { FormLoginComponent } from './form-login/form-login.component';
import { AlertService } from '@pim-final/components';

@NgModule({
  imports: [CommonModule, RouterModule, LoginRouting, ReactiveFormsModule, FormsModule],
  exports: [],
  declarations: [LoginComponent, FormLoginComponent],
  providers: [AlertService],
})
export class LoginModule { }
