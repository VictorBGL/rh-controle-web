import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { AlertService, BaseComponent, ModalConfirmacaoComponent, ModalService } from "@pim-final/components";
import { UsuarioResponseModel } from "@pim-final/data";
import { UsuarioFilterFormGroup } from "@pim-final/forms";
import { UsuarioService } from "@pim-final/services";
import { debounceTime, distinctUntilChanged, filter, switchMap, take, takeUntil } from "rxjs";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { CadEditFuncionariosComponent } from "./cad-edit-funcionarios/cad-edit-funcionarios.component";
import { Router } from "@angular/router";
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

@Component({
    selector: 'rh-controle-web-lista-funcionarios',
    templateUrl: 'lista-funcionarios.component.html',
    styleUrls: ['lista-funcionarios.component.scss']
})
  
export class ListaFuncionariosComponent extends BaseComponent implements OnInit {

  dataSource: UsuarioResponseModel[] = [];
  displayedColumns = ['nome', 'telefone', 'email', 'acesso', 'status', 'acoes'];
  numeroPagina = 2;
  formFiltro: UsuarioFilterFormGroup = new UsuarioFilterFormGroup();
  statusItems = [{nome: 'Ativo', value: true}, {nome: 'Inativo', value: false}];


  @ViewChild('tableContent') tableContent!: ElementRef;

  events: string[] = ['keyup', 'focusout'];

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
      if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight -1) {
      this.usuarioService.getUsuariosFilter(this.formFiltro.value, this.numeroPagina).pipe(take(1)).subscribe((data:any) => {
          this.dataSource = [...this.dataSource, ...data.resultado];
      });
      this.numeroPagina = this.numeroPagina + 1;
      }
  }

  constructor(
      private modalService: ModalService, 
      private usuarioService: UsuarioService,
      private alertService: AlertService,
      private router: Router
    ){
    super();
  }

  ngOnInit(): void {
      this.getFuncionarios();

      this.formFiltro.valueChanges
      .pipe(
      takeUntil(this.destroyed$),
      distinctUntilChanged(),
      debounceTime(300))
      .subscribe(() => this.getFuncionarios())
  }

  getFuncionarios(){
    this.numeroPagina = 2;
    this.usuarioService.getUsuariosFilter(this.formFiltro.value)
    .pipe(take(1))
    .subscribe({
      next: (data) => {
        this.dataSource = data.resultado;
      },
      error: (err) => {

      }
    });
  }

  exportarUsuarios(){
    this.usuarioService.exportarUsuario(this.formFiltro.value)
    .pipe(take(1))
    .subscribe(data => {
        if(data.sucesso){
        const worksheet = XLSX.utils.json_to_sheet(data.resultado);

        const columns = [
          { wch: 20 },
          { wch: 15 },
          { wch: 30 },
          { wch: 15 },
          { wch: 15 },
          { wch: 15 },
          { wch: 15 },
          { wch: 15 },
        ];

        worksheet['!cols'] = columns;

        const workbook = {
          Sheets: { funcionarios: worksheet },
          SheetNames: ['funcionarios'],
        };
        const excelBuffer = XLSX.write(workbook, {
          bookType: 'xlsx',
          type: 'array',
        });

        this.saveAsExcelFile(excelBuffer, 'relatorio-funcionarios');
        }
    });
  }

  abrirCadEdit(data: UsuarioResponseModel | null){
    const modal = this.modalService.open(CadEditFuncionariosComponent, {
      width: '55rem',
      clickOutside: false,
      data,
    });

    modal
      .afterClosed()
      .pipe(
        take(1),
        filter((data) => data != false)
      )
      .subscribe((data: boolean) => {
        if (data) {
          this.getFuncionarios();
        }
      });
  }

  excluirUsuario(id: string, ativo: boolean){
      if(ativo){
          const modal = this.modalService.open(ModalConfirmacaoComponent, {
          width: '30rem',
          data: { titulo: 'Remover Funcionário', mostrarCancelar: true, textoBotaoOk: 'Confirmar', conteudo: 'Deseja realmente remover este Funcionário?' }
          });
      
          modal.afterClosed()
          .pipe(
          take(1),
          filter(data => data == true),
          switchMap(data => this.usuarioService.excluirUsuario(id)))
          .subscribe({
              next: (data) => {
              this.alertService.show({ title: 'Sucesso!', subtitle: 'Funcionário Removido', status: 'sucesso' });
              this.getFuncionarios();
              },
              error: (err) => {
              this.alertService.show({ title: 'Erro!', subtitle: 'Falha ao Remover Funcionário', status: 'erro' });
              }
          });
      } else{
          this.alertService.show({ title: 'Aviso!', subtitle: 'Funcionário já está Inativo', status: 'aviso' });
      }
  }

  abrirCartaoPonto(funcionarioId: string){
    this.router.navigate(['authenticated/cartao-ponto', funcionarioId])
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });

    FileSaver.saveAs(
      data,
      fileName
    );
  }
}
