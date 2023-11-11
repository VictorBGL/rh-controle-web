import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FuncionarioRouting } from "./funcionarios.routing";
import { RouterModule } from "@angular/router";
import { AlertService, ButtonIconModule, InputGroupModule, ModalService } from "@pim-final/components";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FuncionarioComponent } from "./funcionarios.component";
import { ListaFuncionariosComponent } from "./lista-funcionarios/lista-funcionarios.component";
import { CdkTableModule } from '@angular/cdk/table';
import { UsuarioService } from "@pim-final/services";

@NgModule({
    imports: [CommonModule, FuncionarioRouting, RouterModule, InputGroupModule, FormsModule, ReactiveFormsModule, CdkTableModule, ButtonIconModule],
    exports: [],
    declarations: [FuncionarioComponent, ListaFuncionariosComponent],
    providers: [AlertService, ModalService],
})
export class FuncionarioModule { }
