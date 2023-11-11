import { Component, OnInit } from "@angular/core";
import { AlertService, BaseComponent, ModalConfirmacaoComponent, ModalService } from "@pim-final/components";
import { UsuarioService } from "@pim-final/services";
import { filter, switchMap, take } from "rxjs";

@Component({
    selector: 'rh-controle-web-lista-funcionarios',
    templateUrl: 'lista-funcionarios.component.html',
    styleUrls: ['lista-funcionarios.component.scss']
})
  
export class ListaFuncionariosComponent extends BaseComponent implements OnInit {

    dataSource: any[] = [{id: '23', nome: 'Victor', email: 'teste@gmail.com.br', status: 'Ativo'}];
    displayedColumns = ['nome', 'email', 'status', 'acoes'];

    constructor(
            private modalService: ModalService, 
            private usuarioService: UsuarioService,
            private alertService: AlertService
        ){
        super();
    }

    ngOnInit(): void {
    }

    getFuncionarios(){

    }

    excluirUsuario(id: string){
        const modal = this.modalService.open(ModalConfirmacaoComponent, {
        width: '30rem',
        data: { titulo: 'Remover Funcionário', mostrarCancelar: true, textoBotaoOk: 'Confirmar', conteudo: 'Deseja realmente remover este Funcionário?' }
        });
    
        modal.afterClosed()
        .pipe(
            take(1),
            filter(data => data == true),
            switchMap(data => this.usuarioService.excluirFuncionario(id)))
        .subscribe({
            next: (data) => {
            this.alertService.show({ title: 'Sucesso!', subtitle: 'Cliente removido', status: 'sucesso' });
            this.getFuncionarios();
            },
            error: (err) => {
            this.alertService.show({ title: 'Erro!', subtitle: 'Falha ao remover cliente', status: 'erro' });
            }
        });
    }
}
