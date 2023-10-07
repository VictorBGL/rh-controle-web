import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FuncionarioRouting } from "./funcionarios.routing";
import { RouterModule } from "@angular/router";
import { InputGroupModule } from "@pim-final/components";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FuncionarioComponent } from "./funcionarios.component";
import { ListaFuncionariosComponent } from "./lista-funcionarios/lista-funcionarios.component";
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
    imports: [CommonModule, FuncionarioRouting, RouterModule, InputGroupModule, FormsModule, ReactiveFormsModule, CdkTableModule],
    exports: [],
    declarations: [FuncionarioComponent, ListaFuncionariosComponent],
    providers: [],
})
export class FuncionarioModule { }
