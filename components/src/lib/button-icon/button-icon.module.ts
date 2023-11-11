import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ButtonIconComponent } from "./button-icon.component";

@NgModule({
    declarations: [ButtonIconComponent],
    exports: [ButtonIconComponent],
    imports: [RouterModule, CommonModule, FormsModule]
})
export class ButtonIconModule {}
