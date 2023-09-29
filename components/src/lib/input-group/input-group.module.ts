import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgModule } from "@angular/core";
import { InputGroupComponent } from "./input-group.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
    declarations: [InputGroupComponent],
    exports: [InputGroupComponent],
    imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule, CurrencyMaskModule, NgxMaskModule.forRoot()]
})
export class InputGroupModule { }
