import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '@pim-final/services';

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
    private usuarioService: UsuarioService
  ) { }



  logout() {
    this.usuarioService.logout();
  }

  ativo(menu: string): boolean {
    if (this.router.url.indexOf('funcionarios') >= 0 && menu === 'funcionarios')
      return true;
    else if (this.router.url.indexOf('cartao-ponto') >= 0 && menu === 'cartao-ponto')
      return true;

    return false;
  }
}
