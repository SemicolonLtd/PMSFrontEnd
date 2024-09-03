import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class ErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let messageService = inject(NzMessageService);
    // return next(req).pipe(
    //   tap((event: HttpEvent<any>) => {
    //     if (event instanceof HttpResponse) {
    //       if (event.body && event.body.success === false) {
    //         if (event.body?.data?.error) {
    //           // messageService.create('error', event.body?.data?.error);
    //         } else {
    //           Object.keys(event.body.errors).forEach((key) => {
    //             // messageService.create('error', event.body.errors[key]);
    //           })
    //         }
    //         throwError(() => new Error(event.body.message || 'An unknown error occurred'));
    //       }
    //     }
    //   }),
    //   catchError((error: HttpErrorResponse) => {
    //     // messageService.create('error', error.message);
    //     return throwError(() => error);
    //   })
    // );

    return next.handle(request);
  }
}
