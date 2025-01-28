import { NgModule, TransferState } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { CookieService, CookieBackendService } from '@gorniv/ngx-universal';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateInterceptor } from './translate.interceptor';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { translateServerLoaderFactory } from './translate-server.loader';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateServerLoaderFactory,
        deps: [TransferState]
      }
    })
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TranslateInterceptor, multi: true },
    { provide: CookieService, useClass: CookieBackendService },
  ]
})
export class AppServerModule {}
