import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'rh-controle-web-button',
    templateUrl: './button-icon.component.html',
    styleUrls: ['./button-icon.component.scss']
})
export class ButtonIconComponent {

    @ViewChild('btn') btn!: ElementRef;

    @Input() iconeEsquerda: boolean = true;
    @Input() texto: string | null | undefined = '';
    @Input() icone: string = '';
    @Input() btnSecondary?: boolean;
    @Input() btnDanger?: boolean;
    @Input() btnWaring?: boolean;
    @Input() btnOutline?: boolean;
    @Input() disabled: boolean = false;
    @Input() onlyIcon: boolean = false;
    @Input() title: string = '';
    @Input() larguraMaxima: boolean = false;

    @Input() dropButton?: boolean = false;
    isOpen = false;

    @Input() listButtons?: any[];


    onToogle() {
        this.isOpen = !this.isOpen;
    }

}
