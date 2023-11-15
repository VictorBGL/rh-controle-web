import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from './loading.service';
import { LoadingComponent } from './loading.component';

/**
 * This class is for intercepting http requests. When a request starts, we set the loadingSub property
 * in the LoadingService to true. Once the request completes and we have a response, set the loadingSub
 * property to false. If an error occurs while servicing the request, set the loadingSub property to false.
 * @class {HttpRequestInterceptor}
 */
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private loading: LoadingService
  ) { }



  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const ref = this.loading.open(LoadingComponent);
    this.loading.aberto();
    return new Observable(observer => {
      const subscription = next.handle(request)
        .pipe(finalize(() => {
          ref.close();
          this.loading.fechado();
        }))
        .subscribe({
          next: event => {
            if (event instanceof HttpResponse) {
              ref.close();
              this.loading.fechado();
              observer.next(event);
            }
          },
          error: (err) => {
            ref.close();
            this.loading.fechado();
            observer.error(err);
          }
        });
      return () => {
        subscription.unsubscribe();
        this.loading.fechado();
      };
    });
  }
}