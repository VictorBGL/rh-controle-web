import { OverlayModule } from "@angular/cdk/overlay";
import { NgModule } from "@angular/core";
import { TooltipComponent } from "./tooltip.component";
import { TooltipDirective } from "./tooltip.directive";
@NgModule({
    declarations: [
        TooltipDirective,
        TooltipComponent
    ],
    imports: [
        OverlayModule
    ],
    exports: [
        TooltipDirective,
        TooltipComponent
    ]
}) export class TooltipModule {

}