import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// import { AuthService } from '@pede-entrega-web/services';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';

@NgModule({
  imports: [RouterModule, CommonModule],
  exports: [MenuComponent],
  declarations: [MenuComponent],
  providers: [],
})
export class MenuModule { }
