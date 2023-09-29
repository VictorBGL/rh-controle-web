import { NgModule } from '@angular/core';

import { AuthenticatedComponent } from './authenticated.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticatedRouting } from './authenticated.routing';
import { HeaderModule, InputGroupModule, MenuModule } from '@pim-final/components';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, RouterModule, AuthenticatedRouting, MenuModule, HeaderModule, InputGroupModule, ReactiveFormsModule],
    exports: [],
    declarations: [AuthenticatedComponent],
    providers: [],
})
export class AuthenticatedModule { }
