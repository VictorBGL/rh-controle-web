
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@pim-final/components';
import { filter, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'rh-controle-web-form-login',
  templateUrl: 'form-login.component.html',
  styleUrls: ['form-login.component.scss']
})

export class FormLoginComponent extends BaseComponent {

  typePassword = 'password';

  constructor(
    private router: Router
  ) {
    super();
  }

  exibirSenha() {
    this.typePassword = this.typePassword == 'password' ? 'text' : 'password';
  }

  login(){
    this.router.navigate(['/authenticated/funcionarios']);
  }
}
