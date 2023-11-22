import { Component, Inject, OnInit } from "@angular/core";
import { AlertService, BaseComponent, DIALOG_DATA, DialogRef } from "@pim-final/components";
import { PontoEditFormGroup } from "@pim-final/forms";
import { CartaoPontoService } from "@pim-final/services";
import { take } from "rxjs";

@Component({
    selector: 'rh-controle-web-edit-ponto',
    templateUrl: './modal-edit-ponto.component.html',
    styleUrls: ['./modal-edit-ponto.component.scss'],
  })
  export class ModalEditPontoComponent extends BaseComponent implements OnInit {

    form: PontoEditFormGroup = new PontoEditFormGroup();

    modalAberta = false;
    imagemAtual = '';

    constructor(
      @Inject(DIALOG_DATA) public data: {dia: string, usuarioId: string, idDia: string},
      private dialogRef: DialogRef,
      private alertService: AlertService,
      private cartaoPontoService: CartaoPontoService
    ) {
      super();
    }

    ngOnInit(): void {
        this.cartaoPontoService.getDiaHorario(this.data.idDia, this.data.usuarioId)
        .pipe(take(1))
        .subscribe(data => {
            if(data.sucesso){
                this.form.diaId.setValue(data.resultado.id);
                this.form.usuarioId.setValue(this.data.usuarioId);

                
                data.resultado.horarios.forEach(p => {
                    p.horario = p.horario.replace(/\.\d{1,7}/, '');
                    this.form.addHorario(p)
                });

                if(data.resultado.horarios.length === 0){
                    for(var x = 1; x <= 4; x++){
                        this.form.addHorario();
                    }
                }
                else if(data.resultado.horarios.length === 1){
                    for(var x = 1; x <= 3; x++){
                        this.form.addHorario();
                    }
                }
                else if(data.resultado.horarios.length === 2){
                    for(var x = 1; x <= 2; x++){
                        this.form.addHorario();
                    }
                }
                else if(data.resultado.horarios.length === 3){
                    this.form.addHorario();
                }
            }
        });
    }

    returnLabel(index: number): string{
        switch(index){
            case 0:
                return 'Horário Entrada 1';
            case 1:
                return 'Horário Saída 1';
            case 2:
                return 'Horário Entrada 2';
            case 3:
                return 'Horário Saída 2';
        }

        return 'Horário';
    }

    fecharModal() {
        this.modalAberta = false;
    }

    abrirModalImg(img: string){
        this.imagemAtual = img;
        this.modalAberta = true;
    }

    fechar() {
        this.dialogRef.close(false);
    }

    salvar(){
        if(this.form.horarios.value[3].horario === '' || this.form.horarios.value[3].horario === null){
            this.form.removerHorario(3);
        }
        if(this.form.horarios.value[2].horario === '' || this.form.horarios.value[2].horario === null){
            this.form.removerHorario(2);
        }
        if(this.form.horarios.value[1].horario === '' || this.form.horarios.value[1].horario === null){
            this.form.removerHorario(1);
        }
        if(this.form.horarios.value[0].horario === '' || this.form.horarios.value[0].horario === null){
            this.form.removerHorario(0);
        }

        this.cartaoPontoService.editarHorariosPonto(this.form.value)
        .pipe(take(1))
        .subscribe(data => {
            if(data.sucesso)
                this.dialogRef.close(true);
        });
    }
    
}