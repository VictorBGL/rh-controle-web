import { Component, Input } from "@angular/core";

@Component({
    selector: 'pede-entrega-web-tooltip-component',
    templateUrl: './tooltip.component.html'
})export class TooltipComponent {

    @Input() text!: string;

}
