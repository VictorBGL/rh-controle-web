import { ConnectedPosition, Overlay, OverlayConfig, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Directive, ElementRef, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { TooltipPosition } from './tooltip.interfaces';

@Directive({ selector: '[tooltip]' })
export class TooltipDirective implements OnInit, OnDestroy {

    @Input('tooltip') text = '';

    @Input('tooltipPosition') position: TooltipPosition = 'top';

    private overlayRef!: OverlayRef;

    constructor(
        private overlayPositionBuilder: OverlayPositionBuilder,
        private el: ElementRef,
        private overlay: Overlay
    ) { }

    ngOnInit(): void {
        const config = this.getOverlayConfig(this.position);
        this.overlayRef = this.overlay.create(config);
    }

    ngOnDestroy(): void {
        this.overlayRef.detach();
    }

    private getOverlayConfig(position: TooltipPosition): OverlayConfig {
        const overlayConfig = new OverlayConfig({
            scrollStrategy: this.overlay.scrollStrategies.noop()
        });

        let strategy: ConnectedPosition = {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
        };

        if (position == 'top')
            strategy = {
                originX: 'center',
                originY: 'top',
                overlayX: 'center',
                overlayY: 'bottom',
                offsetY: -5,
            };

        if (position == 'bottom')
            strategy = {
                originX: 'center',
                originY: 'bottom',
                overlayX: 'center',
                overlayY: 'top',
                offsetY: 5
            };

        if (position == 'left' || position == 'start')
            strategy = {
                originX: 'start',
                originY: 'center',
                overlayX: 'end',
                overlayY: 'center',
                offsetX: -5
            };

        if (position == 'right' || position == 'end')
            strategy = {
                originX: 'end',
                originY: 'center',
                overlayX: 'start',
                overlayY: 'center',
                offsetX: 5
            };


        const positionStrategy = this.overlayPositionBuilder
            // Create position attached to the elementRef
            .flexibleConnectedTo(this.el)
            // Describe how to connect overlay to the elementRef
            // Means, attach overlay's center bottom point to the
            // top center point of the elementRef.
            .withPositions([
                strategy
            ]);

        overlayConfig.positionStrategy = positionStrategy;

        return overlayConfig;
    }

    @HostListener('mouseenter')
    show() {
        // Create tooltip portal
        const tooltipPortal = new ComponentPortal(TooltipComponent);

        // Attach tooltip portal to overlay
        const tooltipRef: ComponentRef<TooltipComponent> = this.overlayRef.attach(tooltipPortal);

        // Pass content to tooltip component instance
        tooltipRef.instance.text = this.text;
    }


    @HostListener('mouseleave')
    hide() {
        this.overlayRef.detach();
    }
}
