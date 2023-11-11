import { Component, Inject } from "@angular/core";
import { DIALOG_DATA, DialogRef } from "../modal";
import { BaseComponent } from "../base.component";

@Component({
  selector: "rh-controle-web-modal-confirmacao",
  templateUrl: "./modal-confirmacao.component.html",
  styleUrls: ["./modal-confirmacao.component.scss"],
})
export class ModalConfirmacaoComponent extends BaseComponent {

  /**
   *
   */
  constructor(
    @Inject(DIALOG_DATA) public data: {
      titulo: string, 
      subtitulo: string,
      conteudo: string,
      textoBotaoOk: string;
      mostrarCancelar: boolean
    }, 
    private ref: DialogRef
  ) {
    super();
  }

  fechar(): void {
    this.ref.close();
  }

  salvar(): void {
    this.ref.close(true);
  }
}
