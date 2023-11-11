import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from './error-handler';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    /**
     *
     */
    constructor(private handle: ErrorHandler) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    switch(error.status) {
                        case 400:
                            let erros = error.error.erros;
                            this.handle.handleError(erros);
                            return throwError(() => "Bad Request");
                        case 401:
                            return throwError(() => "Unauthorized");
                        default:
                            this.handle.handleError(['Erro interno, por favor contate o administrador.']);
                            return throwError(() => "Internal error");
                    }
                })
            );
    }
}
