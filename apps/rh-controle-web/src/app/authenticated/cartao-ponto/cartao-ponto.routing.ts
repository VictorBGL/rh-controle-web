import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartaoPontoComponent } from "./cartao-ponto.component";
import { ListaCartaoPontoComponent } from "./lista-cartao-ponto/lista-cartao-ponto.component";

const routes: Routes = [
  {
    path: '',
    component: CartaoPontoComponent,
    children: [
      {
        path: '',
        component: ListaCartaoPontoComponent
      },
      {
        path: ':id',
        component: ListaCartaoPontoComponent
      },
    ]
  }
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartaoPontoRouting { }
  