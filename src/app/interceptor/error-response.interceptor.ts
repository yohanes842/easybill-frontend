import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Route } from '../enums/Route';
import { CustomMessageService } from '../services/message/custom-message.service';
import { Severity } from '../enums/Severity';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class ErrorResponseInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private messageService: CustomMessageService,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          let errMsg;
          if (
            error.error instanceof ErrorEvent ||
            error.error instanceof ProgressEvent
          ) {
            errMsg = 'Connection error, please try again later';
          } else {
            switch (error.status) {
              case 401:
              case 403:
                this.authService.logout();
                break;
              default:
                errMsg = error.error.status.message;
                break;
            }
          }
          this.messageService.showMessage(
            Severity.ERROR,
            'REQUEST ERROR',
            errMsg
          );
        } else {
          console.error('some thing else happened');
        }
        return throwError(() => error.error.status);
      })
    );
  }
}
