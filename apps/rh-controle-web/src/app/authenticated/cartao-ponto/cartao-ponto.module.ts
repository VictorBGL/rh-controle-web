import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CartaoPontoRouting } from "./cartao-ponto.routing";
import { RouterModule } from "@angular/router";
import { AlertService, ButtonIconModule, InputGroupModule, ModalService } from "@pim-final/components";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CdkTableModule } from "@angular/cdk/table";
import { NgSelectModule } from "@ng-select/ng-select";
import { CartaoPontoComponent } from "./cartao-ponto.component";
import { ListaCartaoPontoComponent } from "./lista-cartao-ponto/lista-cartao-ponto.component";
import { ModalCadPontoComponent } from "./lista-cartao-ponto/modal-cad-ponto/modal-cad-ponto.component";
import { CartaoPontoService } from "@pim-final/services";

@NgModule({
    imports: [CommonModule, CartaoPontoRouting, RouterModule, InputGroupModule, FormsModule, ReactiveFormsModule, CdkTableModule, ButtonIconModule, NgSelectModule],
    exports: [],
    declarations: [CartaoPontoComponent, ListaCartaoPontoComponent, ModalCadPontoComponent],
    providers: [AlertService, ModalService, CartaoPontoService],
})
export class CartaoPontoModule { }
