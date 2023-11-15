import { Component, Inject, OnInit } from "@angular/core";
import { AlertService, BaseComponent, DIALOG_DATA, DialogRef } from "@pim-final/components";
import { UsuarioResponseModel } from "@pim-final/data";
import { UsuarioFormGroup } from "@pim-final/forms";
import { UsuarioService } from "@pim-final/services";
import { take } from "rxjs";

@Component({
  selector: 'rh-controle-web-cad-edit-funcionarios',
  templateUrl: './cad-edit-funcionarios.component.html',
  styleUrls: ['./cad-edit-funcionarios.component.scss'],
})
export class CadEditFuncionariosComponent extends BaseComponent implements OnInit {
  
  form: UsuarioFormGroup = new UsuarioFormGroup();
  statusItems = [{nome: 'Ativo', value: true}, {nome: 'Inativo', value: false}];
  acessoItems = [{nome: 'Administrador', value: 'admin'}, {nome: 'Funcionário', value: 'funcionario'}];

  showPassword = false;
  showPasswordConfirm = false;

  constructor(
    @Inject(DIALOG_DATA) public data: UsuarioResponseModel | null,
    private dialogRef: DialogRef,
    private usuarioService: UsuarioService,
    private alertService: AlertService
  ) {
    super();
  }

  ngOnInit() {
    if(this.data !== null){
      this.form.patchValue(this.data);
    }
  }

  fechar() {
    this.dialogRef.close(false);
  }

  salvar(){
    const { value, valid } = this.form;

    if(valid){
      if((this.form.senha.value !== '' && this.form.senha.value !== '') && (this.form.senha.value != this.form.senhaConfirmacao.value)){
        this.alertService.show({ title: 'Aviso!', subtitle: 'As senhas devem ser iguais!', status: 'aviso' });
      } else {
        if(this.data === null){
          this.usuarioService.salvarUsuario(value)
          .pipe(take(1))
          .subscribe({
            next: (data) => {
              if(data.sucesso){
                this.alertService.show({ title: 'Sucesso!', subtitle: 'Funcionário Cadastrado', status: 'sucesso' });
                this.dialogRef.close(true);
              }
            },
            error: (err) => {
              this.alertService.show({ title: 'Erro!', subtitle: err.error.erros[0], status: 'erro' });
            }
          });
        } else {
          this.usuarioService.editarUsuario(value, this.data.id)
          .pipe(take(1))
          .subscribe({
            next: (data) => {
              if(data.sucesso){
                this.alertService.show({ title: 'Sucesso!', subtitle: 'Funcionário Editado', status: 'sucesso' });
                this.dialogRef.close(true);
              }
            },
            error: (err) => {
              this.alertService.show({ title: 'Erro!', subtitle: err.error.erros[0], status: 'erro' });
            }
          });
        }
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}