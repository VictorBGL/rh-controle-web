
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, BaseComponent } from '@pim-final/components';
import { UsuarioService } from '@pim-final/services';
import { filter, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'rh-controle-web-form-login',
  templateUrl: 'form-login.component.html',
  styleUrls: ['form-login.component.scss']
})

export class FormLoginComponent extends BaseComponent {

  typePassword = 'password';

  constructor(
    private router: Router,
    private alertService: AlertService,
    private service: UsuarioService
  ) {
    super();
  }

  exibirSenha() {
    this.typePassword = this.typePassword == 'password' ? 'text' : 'password';
  }

  login(){
    let valid = true;
    // const { value, valid } = this.form;
    if (valid) {
      this.service.login({email: 'victor.lino@treeinova.com.br', senha: 'Teste@123'})
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          if (data.authenticated) {
            this.service.setToken(data);
            this.router.navigate(['/authenticated/funcionarios']);
          } else {
            this.alertService.show({ title: 'Erro!', subtitle: 'Usuário ou senha inválidos!', status: 'erro' });
          }
        },
        error: (err) => {
          this.alertService.show({ title: 'Erro!', subtitle: err.error.erros[0], status: 'erro' });
        }
      });
    } else {
      this.alertService.show({ title: 'Erro!', subtitle: 'Usuário ou senha inválidos!', status: 'erro' });
    }
  }
}
