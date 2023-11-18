import { FormBuilder, FormControl } from "@angular/forms";
import { BaseFormGroup } from "../base.form";

const fb = new FormBuilder();

export class BaterPontoFormGroup extends BaseFormGroup {

  get observacao(): FormControl {
      return this.get('observacao') as FormControl;
  }

  get imagem(): FormControl {
    return this.get('imagem') as FormControl;
  }

  get endereco(): FormControl {
      return this.get('endereco') as FormControl;
  }

  get usuarioId(): FormControl {
      return this.get('usuarioId') as FormControl;
  }

  constructor() {
    super({
      observacao: fb.control(''),
      imagem: fb.control(''),
      endereco: fb.control(null),
      usuarioId: fb.control(null),
    });
  }
}
