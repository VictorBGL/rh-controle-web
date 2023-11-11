import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject } from '@angular/core';
import { AlertRef } from './alert-ref';
import { AlertOptions } from './alert.interfaces';
import { ALERT_OPTIONS } from './alert.tokens';

const ANIMATION_TIMINGS = '400ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
    selector: 'rh-controle-web-alert',
    templateUrl: './alert.component.html',
    animations: [
        trigger('fade', [
            state('fadeOut', style({ opacity: 0 })),
            state('fadeIn', style({ opacity: 1 })),
            transition('* => fadeIn', animate(ANIMATION_TIMINGS))
        ]),
        trigger('slideContent', [
            state('void', style({ transform: 'translate3d(0, 25%, 0) scale(0.9)', opacity: 0 })),
            state('enter', style({ transform: 'none', opacity: 1 })),
            state('leave', style({ transform: 'translate3d(0, 25%, 0)', opacity: 0 })),
            transition('* => *', animate(ANIMATION_TIMINGS)),
        ])
    ]
})
export class AlertComponent {

    animationState: 'void' | 'enter' | 'leave' = 'enter';

    constructor(
        public alertRef: AlertRef,
        @Inject(ALERT_OPTIONS) public data: AlertOptions
    ) {
    }

    close(): void {
        this.alertRef.close();
    }
}
