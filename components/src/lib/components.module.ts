import { CommonModule } from "@angular/common";
import { InputGroupModule } from "./input-group/input-group.module";
import { NgModule } from "@angular/core";

const modules = [
  InputGroupModule,
  CommonModule,
];

@NgModule({
  imports: [...modules],
  declarations: [],
  exports: [...modules],
})
export class ComponentsModule {}
