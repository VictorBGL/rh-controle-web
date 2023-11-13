import { FormBuilder, FormControl } from "@angular/forms";
import { BaseFormGroup } from "../base.form";

const fb = new FormBuilder();

export class UsuarioFilterFormGroup extends BaseFormGroup {

  get direcaoOrdem(): FormControl {
      return this.get('direcaoOrdem') as FormControl;
  }

  get colunaOrdem(): FormControl {
    return this.get('colunaOrdem') as FormControl;
  }

  get termo(): FormControl {
      return this.get('termo') as FormControl;
  }

  get ativo(): FormControl {
      return this.get('ativo') as FormControl;
  }

  constructor() {
    super({
      direcaoOrdem: fb.control(''),
      colunaOrdem: fb.control(''),
      termo: fb.control(''),
      ativo: fb.control(null),
    });
  }
}
