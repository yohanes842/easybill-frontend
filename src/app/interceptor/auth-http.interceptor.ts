import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ErrorResponse } from '../interfaces/error-response';
import { LoadingService } from '../services/loading/loading.service';

@Injectable()
export class AuthApiInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.isLoading = true;

    const user = localStorage.getItem('currentUser');
    if (user) {
      const token = JSON.parse(user).access_token; //get token
      const authRequest = req.clone({
        headers: req.headers
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + token),
      });
      return next.handle(authRequest).pipe(
        tap({
          next: (event) => {
            if (event instanceof HttpResponse) {
              this.loadingService.isLoading = false;
            }
          },
          error: (err: ErrorResponse) => {
            this.loadingService.isLoading = false;
          },
        })
      );
    } else {
      return next.handle(req).pipe(
        tap({
          next: (event) => {
            if (event instanceof HttpResponse) {
              this.loadingService.isLoading = false;
            }
          },
          error: (err: ErrorResponse) => {
            this.loadingService.isLoading = false;
          },
        })
      );
    }
  }
}
