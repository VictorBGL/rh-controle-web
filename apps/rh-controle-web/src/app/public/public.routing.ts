import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'acesso',
    loadChildren: () => import('./login/login.module').then(x => x.LoginModule),
  },
  {
    path: '',
    redirectTo: 'acesso/login',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRouting { }
