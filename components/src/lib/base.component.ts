import { Directive, OnDestroy } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { Subject, Subscription } from "rxjs";

@Directive()
export class BaseComponent implements OnDestroy {
  private subscriptions = new Subscription();
  protected destroyed$ = new Subject<void>();

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.destroyed$.next();
  }

  protected addSubscription(subscription: Subscription) {
    this.subscriptions.add(subscription);
  }


  isFieldValid(control: AbstractControl) {
    if (!control)
      return false;

    return control.touched && control.invalid;
  }

  displayFieldCss(control: AbstractControl) {
    return this.isFieldValid(control) ? 'invalid' : '';
  }

  displayFieldMessage(control: AbstractControl) {
    let invalido = this.isFieldValid(control);
    if(invalido){
      if(control.hasError('onlyNumber'))
        return 'Não é permitido inserir caracteres, apenas números!'

      else if(control.hasError('required'))
        return 'Preencha, campo obrigatório!';

      else if(control.hasError('email'))
        return 'Preencha corretamente o campo de email!';

      else if(control.hasError('formatInvalid'))
        return 'Formato inválido!';

      else if(control.hasError('cepInvalid'))
        return 'Cep inválido!';

      return '';
    }
    return '';
  }
}
