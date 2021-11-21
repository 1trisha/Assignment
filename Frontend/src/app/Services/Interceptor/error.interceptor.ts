import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ErrorHandleService } from '../error-handle.service';
import { catchError } from 'rxjs/operators';
import { SkyWaitService } from '@skyux/indicators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private errorHandleService: ErrorHandleService,
    private waitSvc: SkyWaitService
  ) {}
  // intercept function
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        this.waitSvc.endBlockingPageWait();
        this.errorHandleService.handleError(error);
        return throwError(error.message);
      })
    );
  }
}
