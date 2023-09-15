/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthenticatedComponent } from "./authenticated.component";
import { FuncionariosComponent } from "./funcionarios/funcionarios.component";


const routes: Routes = [
  {
    path: '',
    component: AuthenticatedComponent,
    children: [
      {
        path: 'funcionarios',
        component: FuncionariosComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticatedRouting { }
