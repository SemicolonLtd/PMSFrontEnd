import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private cookieService = inject(CookieService);
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Intercept logic here (e.g., add headers, modify requests)
    if (environment.lang) {
      request = request.clone({
        setHeaders: {
          'x-lang': this.cookieService.get('lang') || ''
        }
      })
    }
    return next.handle(request);
  }
}