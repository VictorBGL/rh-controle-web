import { Overlay, OverlayConfig } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable, Injector } from "@angular/core";
import { AlertRef } from "./alert-ref";
import { AlertComponent } from "./alert.component";
import { AlertConfig, AlertOptions, DEFAULT_ALERT_CONFIG, DEFAULT_ALERT_OPTIONS } from "./alert.interfaces";
import { ALERT_OPTIONS } from './alert.tokens';

@Injectable()
export class AlertService {

    /**
 *
 */
    constructor(
        private overlay: Overlay,
    ) {

    }

    show(options: AlertOptions, config: AlertConfig = {}) {
        const alertConfig = { ...DEFAULT_ALERT_CONFIG, ...config };
        const alertOptions = { ...DEFAULT_ALERT_OPTIONS, ...options };

        // Returns an OverlayRef which is a PortalHost
        const overlayRef = this.createOverlay(alertConfig);

        const alertRef = new AlertRef(overlayRef);

        const injector = Injector.create({
            providers: [
                { provide: ALERT_OPTIONS, useValue: alertOptions },
                { provide: AlertRef, useValue: alertRef }
            ]
        })

        // Create ComponentPortal that can be attached to a PortalHost
        const alertComponent = new ComponentPortal(AlertComponent, undefined, injector);

        // Attach ComponentPortal to PortalHost
        overlayRef.attach(alertComponent);

        // const overlayComponent = this.attachDialogContainer(overlayRef, config, alertRef);

        if (alertConfig.duration)
            setTimeout(() => {
                alertRef.close();
            }, alertConfig.duration);

        return alertRef;
    }

    private createOverlay(config: AlertConfig) {
        // Returns an OverlayConfig
        const overlayConfig = this.getOverlayConfig(config);

        // Returns an OverlayRef
        return this.overlay.create(overlayConfig);
    }

    private getOverlayConfig(config: AlertConfig): OverlayConfig {

        const overlayConfig = new OverlayConfig({
            scrollStrategy: this.overlay.scrollStrategies.block()
        });

        const positionStrategy = this.overlay.position().global();

        const isLeft = (
            config.horizontalPosition === 'left' || config.horizontalPosition === 'start');

        const isRight = !isLeft && config.horizontalPosition !== 'center';

        if (isLeft) {
            positionStrategy.left('0');
        } else if (isRight) {
            positionStrategy.right('0');
        } else {
            positionStrategy.centerHorizontally();
        }

        if (config.verticalPosition === 'top') {
            positionStrategy.top('0');
        } else {
            positionStrategy.bottom('0');
        }

        overlayConfig.positionStrategy = positionStrategy;

        return overlayConfig;
    }
}
