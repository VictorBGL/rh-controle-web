import { NgModule } from '@angular/core';

import { AuthenticatedComponent } from './authenticated.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticatedRouting } from './authenticated.routing';
import { MenuModule } from '@pim-final/components';

@NgModule({
    imports: [CommonModule, RouterModule, AuthenticatedRouting, MenuModule],
    exports: [],
    declarations: [AuthenticatedComponent],
    providers: [],
})
export class AuthenticatedModule { }
