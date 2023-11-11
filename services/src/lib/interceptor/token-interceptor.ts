import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsuarioService } from '@pim-final/services';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private service: UsuarioService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.service.getToken();
		if (token == null)
			return next.handle(request);

        request = request.clone({
			setHeaders: {
				'Authorization': `Bearer ${token?.accessToken}`
			},
		});

		return next.handle(request).pipe(catchError(err => {
			if (err.status === 401 && !token) {
				this.service.logout();
			}

			return throwError(err);
		}));
    }
}
