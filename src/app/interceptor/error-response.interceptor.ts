import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Severity } from '../enums/Severity';
import { AuthService } from '../services/auth/auth.service';
import { CustomMessageService } from '../services/message/custom-message.service';

@Injectable()
export class ErrorResponseInterceptor implements HttpInterceptor {
  constructor(
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
                if (error.error.status.code != 'UNAUTHORIZED_RESOURCE_ACCESS')
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
          console.error('something else happened');
        }
        return throwError(() => error.error.status);
      })
    );
  }
}
