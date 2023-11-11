import { OverlayRef } from "@angular/cdk/overlay";

export class AlertRef {

    constructor(private overlayRef: OverlayRef) { }
  
    close(): void {
      this.overlayRef.dispose();
    }
  }