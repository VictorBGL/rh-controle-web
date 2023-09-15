import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from '@pede-entrega-web/services';

@Component({
  selector: 'rh-controle-web-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss']
})

export class MenuComponent {

  perfilUsuario: string | null | undefined;
  nomeUsuario: string | null | undefined;
  emailUsuario: string | null | undefined;
  menuHamburguerAberto = false;


  constructor(
    private router: Router,
  ) { }



  logout() {
    // this.authService.logout();
  }

  ativo(menu: string): boolean {
    if (this.router.url.indexOf('funcionarios') >= 0 && menu === 'funcionarios')
      return true;

    if (this.router.url.indexOf('entregador') >= 0 && menu === 'entregador')
      return true;

    if (this.router.url.indexOf('escala') >= 0 && menu === 'escala')
      return true;

    if (this.router.url.indexOf('financeiro') >= 0 && menu === 'financeiro')
      return true;

    if (this.router.url.indexOf('visao-entregador') >= 0 && menu === 'visao-entregador')
      return true;

    return false;
  }


}
