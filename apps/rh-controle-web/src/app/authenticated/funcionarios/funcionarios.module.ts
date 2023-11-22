import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FuncionarioRouting } from "./funcionarios.routing";
import { RouterModule } from "@angular/router";
import { AlertService, ButtonIconModule, InputGroupModule, ModalService, TooltipModule } from "@pim-final/components";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FuncionarioComponent } from "./funcionarios.component";
import { ListaFuncionariosComponent } from "./lista-funcionarios/lista-funcionarios.component";
import { CdkTableModule } from '@angular/cdk/table';
import { CadEditFuncionariosComponent } from "./lista-funcionarios/cad-edit-funcionarios/cad-edit-funcionarios.component";
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    imports: [CommonModule, TooltipModule, FuncionarioRouting, RouterModule, InputGroupModule, FormsModule, ReactiveFormsModule, CdkTableModule, ButtonIconModule, NgSelectModule],
    exports: [],
    declarations: [FuncionarioComponent, ListaFuncionariosComponent, CadEditFuncionariosComponent],
    providers: [AlertService, ModalService],
})
export class FuncionarioModule { }
