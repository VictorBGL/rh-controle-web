import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { AlertService, BaseComponent, ModalConfirmacaoComponent, ModalService } from "@pim-final/components";
import { ModalCadPontoComponent } from "./modal-cad-ponto/modal-cad-ponto.component";
import { debounceTime, distinctUntilChanged, filter, switchMap, take, takeUntil } from "rxjs";
import { PontoFilterFormGroup } from "@pim-final/forms";
import { CartaoPontoService, UsuarioService } from "@pim-final/services";
import { PontoResponseModel } from "@pim-final/data";
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { ModalEditPontoComponent } from "./modal-edit-ponto/modal-edit-ponto.component";
import { ModalFechamentoComponent } from "./modal-fechamento/modal-fechamento.component";

@Component({
    selector: 'rh-controle-web-lista-cartao-ponto',
    templateUrl: 'lista-cartao-ponto.component.html',
    styleUrls: ['lista-cartao-ponto.component.scss'],
    providers: [DatePipe] 
})
  
export class ListaCartaoPontoComponent extends BaseComponent implements OnInit {

    dataSource: PontoResponseModel[] = [];
    displayedColumns = ['dia', 'horarios', 'total', 'feriado', 'acoes'];
    
    formFiltro: PontoFilterFormGroup = new PontoFilterFormGroup();
    numeroPagina = 2;
    nomeUsuario = '';
    usuarioExternoId: string = '';

    acessoUsuario: string = '';

    @ViewChild('tableContent') tableContent!: ElementRef;

    events: string[] = ['keyup', 'focusout'];

    @HostListener('scroll', ['$event'])
    onScroll(event: any) {
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight -1) {
        this.cartaoPontoService.getPontosFilter(this.formFiltro.value, this.numeroPagina).pipe(take(1)).subscribe((data:any) => {
          const datePipe = new DatePipe('en-US');
          data.resultado.forEach((p: any) => {
            if(!p.totalHoras.includes("-") && !p.feriado){
                p.totalHoras = "+" + p.totalHoras;
            }
            
            p.dia = datePipe.transform(p.dia, 'dd/MM/yyyy')!;
            p.totalHoras = p.totalHoras.replace(/\.\d{1,7}/, '');
          });
          this.dataSource = [...this.dataSource, ...data.resultado];
        });
        this.numeroPagina = this.numeroPagina + 1;
        }
    }

    constructor(
        private alertService: AlertService,
        private modalService: ModalService, 
        private usuarioService: UsuarioService, 
        private cartaoPontoService: CartaoPontoService,
        private route: ActivatedRoute
      ){
      super();
      this.route.params
      .subscribe((params: any) => {
        this.usuarioExternoId = params.id;       
      });

      if (this.usuarioExternoId != null) 
        this.formFiltro.usuarioId.setValue(this.usuarioExternoId );
      else
        this.formFiltro.usuarioId.setValue(this.usuarioService.getId());

      this.acessoUsuario = this.usuarioService.getAcesso();

      this.getUsuario();
    }

    ngOnInit(): void {
        this.getHorarios();

        this.formFiltro.valueChanges
        .pipe(
        takeUntil(this.destroyed$),
        distinctUntilChanged(),
        debounceTime(300))
        .subscribe(() => this.getHorarios());
    }

    getUsuario(){
        this.usuarioService.getUsuario(this.formFiltro.usuarioId.value)
        .pipe(take(1))
        .subscribe(data => {
            if(data.sucesso)
                this.nomeUsuario = data.resultado.nome;
        });
    }

    getHorarios(){
        this.numeroPagina = 2;
        this.cartaoPontoService.getPontosFilter(this.formFiltro.value)
        .pipe(take(1))
        .subscribe({
            next: (data) => {
                const datePipe = new DatePipe('en-US');
                this.dataSource = data.resultado;
                this.dataSource.forEach(p => {
                  if(!p.totalHoras.includes("-") && !p.feriado){
                      p.totalHoras = "+" + p.totalHoras;
                  }
                  
                  p.dia = datePipe.transform(p.dia, 'dd/MM/yyyy')!;
                  p.totalHoras = p.totalHoras.replace(/\.\d{1,7}/, '');
                });
            },
            error: (err) => {
                this.alertService.show({ title: 'Erro!', subtitle: err.error.erros[0], status: 'erro' });
            }
        });
    }

    abrirPonto(){
        const modal = this.modalService.open(ModalCadPontoComponent, {
            width: '55rem',
            clickOutside: false,
            data: ''
          });
      
          modal
            .afterClosed()
            .pipe(
              take(1),
              filter((data) => data != false)
            )
            .subscribe((data: boolean) => {
              if (data) {
                this.alertService.show({ title: 'Sucesso!', subtitle: 'Cadastro de Ponto Realizado', status: 'sucesso' });
                this.getHorarios();
              }
            });
    }

    abrirPontoDoDia(dia: Date, idDia: string){
        if(this.acessoUsuario === 'admin'){
            const modal = this.modalService.open(ModalEditPontoComponent, {
                width: '40rem',
                clickOutside: false,
                data: {dia, usuarioId: this.formFiltro.usuarioId.value, idDia}
              });
          
              modal
                .afterClosed()
                .pipe(
                  take(1),
                  filter((data) => data != false)
                )
                .subscribe((data: boolean) => {
                  if (data) {
                    this.alertService.show({ title: 'Sucesso!', subtitle: 'Edição de Ponto Realizado', status: 'sucesso' });
                    this.getHorarios();
                  }
                });
        } else 
            this.alertService.show({ title: 'Aviso!', subtitle: 'Somente um administrador poderá editar um ponto.', status: 'aviso' });
    }

    realizarFechamento(){
      const modal = this.modalService.open(ModalFechamentoComponent, {
        width: '40rem',
        clickOutside: false,
        data: {nome: this.nomeUsuario, id: this.formFiltro.usuarioId.value}
      });
  
      modal
        .afterClosed()
        .pipe(
          take(1),
          filter((data) => data != false)
        )
        .subscribe((data: boolean) => {
        });
    }

    atualizarFeriado(id: string, feriado: boolean){
      if(this.acessoUsuario !== 'admin'){
        this.alertService.show({ title: 'Aviso!', subtitle: 'Você não tem o acesso para realizar essa ação', status: 'aviso' });
      } else if(feriado){
        this.alertService.show({ title: 'Aviso!', subtitle: 'Este dia já está como feriado', status: 'aviso' });
      } else{
        const modal = this.modalService.open(ModalConfirmacaoComponent, {
          width: '30rem',
          data: { titulo: 'Definir Feriado', mostrarCancelar: true, textoBotaoOk: 'Confirmar', conteudo: 'Deseja realmente definir este dia como feriado?' }
          });
      
          modal.afterClosed()
          .pipe(
          take(1),
          filter(data => data == true),
          switchMap(data => this.cartaoPontoService.atualizarFeriado(id)))
          .subscribe({
              next: (data) => {
              this.alertService.show({ title: 'Sucesso!', subtitle: 'Edição do dia Realizado', status: 'sucesso' });
              this.getHorarios();
              },
              error: (err) => {
              this.alertService.show({ title: 'Erro!', subtitle: 'Falha ao Definir Feriado', status: 'erro' });
              }
          });
      }
    }

    styleTable(totalHoras: string, feriado: boolean): string{

        if(feriado)
            return 'amarelo'
        else if(totalHoras.includes("-"))
            return 'vermelho'

        return 'verde'; 
    }
}