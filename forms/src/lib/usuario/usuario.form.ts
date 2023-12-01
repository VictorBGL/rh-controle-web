import { EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { BaseFormGroup } from "../base.form";

const fb = new FormBuilder();

export class UsuarioFormGroup extends BaseFormGroup {

  get nome(): FormControl {
    return this.get('nome') as FormControl;
  }

  get telefone(): FormControl {
    return this.get('telefone') as FormControl;
  }

  get email(): FormControl {
    return this.get('email') as FormControl;
  }

  get salarioBruto(): FormControl {
    return this.get('salarioBruto') as FormControl;
  }

  get dependentes(): FormControl {
    return this.get('dependentes') as FormControl;
  }

  get pensao(): FormControl {
    return this.get('pensao') as FormControl;
  }

  get acesso(): FormControl {
    return this.get('acesso') as FormControl;
  }

  get ativo(): FormControl {
    return this.get('ativo') as FormControl;
  }

  get senha(): FormControl {
    return this.get('senha') as FormControl;
  }

  get senhaConfirmacao(): FormControl {
    return this.get('senhaConfirmacao') as FormControl;
  }

  constructor() {
    super({
      nome: fb.control('', [Validators.required]),
      telefone: fb.control('', [Validators.required]),
      email: fb.control('', [Validators.required, Validators.email]),
      salarioBruto: fb.control(0, [Validators.required]),
      dependentes: fb.control(0),
      pensao: fb.control(0),
      acesso: fb.control(null, [Validators.required]),
      ativo: fb.control(true, [Validators.required]),
      senha: fb.control(''),
      senhaConfirmacao: fb.control(''),
    });
    this.init();
  }

  init() {
		this.senha.valueChanges.subscribe(p => {
			if(p === null || p === ""){
        this.senhaConfirmacao.clearValidators();
				this.senhaConfirmacao.setErrors(null);
			} else {
				this.senhaConfirmacao.setValidators(Validators.required);
				this.senhaConfirmacao.setErrors(Validators.required);
			}
		});
	}
}
