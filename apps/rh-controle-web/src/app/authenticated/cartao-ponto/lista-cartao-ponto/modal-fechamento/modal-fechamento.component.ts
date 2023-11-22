import { Component, OnInit, Inject } from "@angular/core";
import { BaseComponent, DIALOG_DATA, DialogRef } from "@pim-final/components";
import { FechamentoFolhaPagamento } from "@pim-final/data";
import { CartaoPontoService } from "@pim-final/services";
import { take } from "rxjs";

@Component({
    selector: 'rh-controle-web-fechamento',
    templateUrl: './modal-fechamento.component.html',
    styleUrls: ['./modal-fechamento.component.scss'],
  })
  export class ModalFechamentoComponent extends BaseComponent implements OnInit {

    nomeMesPassado = '';

    model!: FechamentoFolhaPagamento;

    constructor(
      @Inject(DIALOG_DATA) public data: {nome: string, id: string},
      private dialogRef: DialogRef,
      private cartaoPontoService: CartaoPontoService
    ) {
      super();
    }

    ngOnInit(): void {
        const dataMesPassado = new Date();
        dataMesPassado.setMonth(dataMesPassado.getMonth() - 1);
        
        const nomesMeses = [
          'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
          'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        
        this.nomeMesPassado = nomesMeses[dataMesPassado.getMonth()];

        this.getDados();
    }

    fechar(){
        this.dialogRef.close(false);
    }

    getDados(){
        this.cartaoPontoService.getfechamentoUsuario(this.data.id)
        .pipe(take(1))
        .subscribe(data => {
            if(data.sucesso){
                this.model = data.resultado;
                this.model.resumoHoras = this.model.resumoHoras.replace(/\.\d{1,7}/, '');
            }
        });
    }
}