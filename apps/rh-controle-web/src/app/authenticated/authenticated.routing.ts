/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticatedComponent } from "./authenticated.component";


const routes: Routes = [
  {
    path: '',
    component: AuthenticatedComponent,
    children: [
      {
        path: 'funcionarios',
        loadChildren: () => import('./funcionarios/funcionarios.module').then(x => x.FuncionarioModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticatedRouting { }
