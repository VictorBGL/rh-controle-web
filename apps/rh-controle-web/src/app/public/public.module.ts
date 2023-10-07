import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PublicRouting } from './public.routing';
import { PublicComponent } from './public.component';

@NgModule({
  imports: [CommonModule, RouterModule, PublicRouting],
  exports: [],
  declarations: [PublicComponent],
  providers: [],
})
export class PublicModule { }
