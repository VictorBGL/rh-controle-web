import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { AlertService, BaseComponent, ModalService } from "@pim-final/components";
import { ModalCadPontoComponent } from "./modal-cad-ponto/modal-cad-ponto.component";
import { debounceTime, distinctUntilChanged, filter, take, takeUntil } from "rxjs";
import { PontoFilterFormGroup } from "@pim-final/forms";
import { CartaoPontoService, UsuarioService } from "@pim-final/services";
import { PontoResponseModel } from "@pim-final/data";
import { DatePipe } from '@angular/common';

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

    @ViewChild('tableContent') tableContent!: ElementRef;

    events: string[] = ['keyup', 'focusout'];

    @HostListener('scroll', ['$event'])
    onScroll(event: any) {
        if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight -1) {
        this.cartaoPontoService.getPontosFilter(this.formFiltro.value, this.numeroPagina).pipe(take(1)).subscribe((data:any) => {
            this.dataSource = [...this.dataSource, ...data.resultado];
        });
        this.numeroPagina = this.numeroPagina + 1;
        }
    }

    constructor(
        private alertService: AlertService,
        private modalService: ModalService, 
        private usuarioService: UsuarioService, 
        private cartaoPontoService: CartaoPontoService
      ){
      super();

      this.formFiltro.usuarioId.setValue(this.usuarioService.getId());
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
                this.getHorarios();
              }
            });
    }

    styleTable(totalHoras: string, feriado: boolean): string{

        if(feriado)
            return 'amarelo'
        else if(totalHoras.includes("-"))
            return 'vermelho'

        return 'verde'; 
    }
}