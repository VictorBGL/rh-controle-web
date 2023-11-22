import { FormArray, FormBuilder, FormControl } from "@angular/forms";
import { BaseFormGroup } from "../base.form";

const fb = new FormBuilder();

export class PontoEditFormGroup extends BaseFormGroup {

  get usuarioId(): FormControl {
    return this.get('usuarioId') as FormControl;
  }

  get diaId(): FormControl {
    return this.get('diaId') as FormControl;
  }

  get horarios(): FormArray {
    return this.get('horarios') as FormArray;
  }

  constructor() {
    super({
      usuarioId: fb.control(''),
      diaId: fb.control(''),
      horarios: fb.array([]),
    });
  }

    addHorario(model = {}): void {
        const control = new HorarioPontoFormGroup();
        control.patchValue(model);
        
        this.horarios.push(control);
    }

    removerHorario(index: number): void {
        this.horarios.removeAt(index);
    }
}

export class HorarioPontoFormGroup extends BaseFormGroup {

    get id(): FormControl {
        return this.get('id') as FormControl;
    }

    get observacao(): FormControl {
      return this.get('observacao') as FormControl;
    }
  
    get imagem(): FormControl {
      return this.get('imagem') as FormControl;
    }
  
    get endereco(): FormControl {
      return this.get('endereco') as FormControl;
    }

    get horario(): FormControl {
        return this.get('horario') as FormControl;
    }
  
    constructor() {
      super({
        id: fb.control(''),
        observacao: fb.control(''),
        imagem: fb.control(''),
        endereco: fb.control(''),
        horario: fb.control(''),
      });
    }

}