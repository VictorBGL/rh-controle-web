import { NgModule } from "@angular/core";
import { ModalConfirmacaoComponent } from "./modal-confirmacao.component";
import { CommonModule } from "@angular/common";
import { ButtonIconModule, InputGroupModule } from "@pim-final/components";

@NgModule({
    imports: [
        ButtonIconModule,
        InputGroupModule,
        CommonModule
    ],
    exports: [ModalConfirmacaoComponent],
    declarations: [ModalConfirmacaoComponent]
})
export class ModalConfirmacaoModule { }