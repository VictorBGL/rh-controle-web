import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FuncionarioComponent } from "./funcionarios.component";
import { ListaFuncionariosComponent } from "./lista-funcionarios/lista-funcionarios.component";

const routes: Routes = [
  {
    path: '',
    component: FuncionarioComponent,
    children: [
      {
        path: '',
        component: ListaFuncionariosComponent
      },
    ]
  }
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRouting { }
  