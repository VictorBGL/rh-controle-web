import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'rh-controle-web-lista-funcionarios',
    templateUrl: 'lista-funcionarios.component.html',
    styleUrls: ['lista-funcionarios.component.scss']
})
  
export class ListaFuncionariosComponent implements OnInit {

    dataSource: any[] = [{nome: 'Victor', email: 'teste@gmail.com.br', status: 'Ativo'}];
    displayedColumns = ['nome', 'email', 'status', 'acoes'];

    constructor(){

    }

    ngOnInit(): void {
    }
}
