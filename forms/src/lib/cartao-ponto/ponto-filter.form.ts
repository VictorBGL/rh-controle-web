import { FormBuilder, FormControl } from "@angular/forms";
import { BaseFormGroup } from "../base.form";

const fb = new FormBuilder();

export class PontoFilterFormGroup extends BaseFormGroup {

  get dataInicio(): FormControl {
      return this.get('dataInicio') as FormControl;
  }

  get dataFim(): FormControl {
    return this.get('dataFim') as FormControl;
  }

  get usuarioId(): FormControl {
      return this.get('usuarioId') as FormControl;
  }

  constructor() {
    super({
      dataInicio: fb.control(''),
      dataFim: fb.control(''),
      usuarioId: fb.control(null),
    });
  }
}
