export interface AlertConfig {
    horizontalPosition?: AlertHorizontalPosition;
    verticalPosition?: AlertVerticalPosition;
    duration?: number;
}

export interface AlertOptions {
    title?: string;
    subtitle?: string;
    status?: string;
}

export type AlertHorizontalPosition = 'start' | 'center' | 'end' | 'left' | 'right';

export type AlertVerticalPosition = 'top' | 'bottom';

export const DEFAULT_ALERT_CONFIG: AlertConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    duration: 5000
}

export const DEFAULT_ALERT_OPTIONS: AlertOptions = {
    // closeTitle: "Fechar"
}
