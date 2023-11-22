import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { BaseFormGroup } from "../base.form";

const fb = new FormBuilder();

export class LoginFormGroup extends BaseFormGroup {

  get email(): FormControl {
      return this.get('email') as FormControl;
  }

  get senha(): FormControl {
    return this.get('senha') as FormControl;
  }

  constructor() {
    super({
      email: fb.control('', [Validators.required]),
      senha: fb.control('', [Validators.required]),
    });
  }
}
