import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert.component";
import { DEFAULT_ALERT_CONFIG, DEFAULT_ALERT_OPTIONS } from "./alert.interfaces";
import { AlertService } from "./alert.service";
import { ALERT_DATA, ALERT_OPTIONS } from "./alert.tokens";

@NgModule({
    declarations: [
        AlertComponent
    ],
    imports: [
        OverlayModule,
        CommonModule
    ],
    exports: [
        AlertComponent
    ],
    providers: [
        {
            provide: ALERT_DATA,
            useValue: DEFAULT_ALERT_CONFIG
        },
        {
            provide: ALERT_OPTIONS,
            useValue: DEFAULT_ALERT_OPTIONS
        },
        AlertService
    ]
}) export class AlertModule { }
