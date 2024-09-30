import { NgModule, TransferState } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CookieModule } from 'ngx-cookie';
// import { AgmCoreModule } from '@agm/core';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    SharedModule,
    ButtonModule,
    HttpClientModule,
    CookieModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ShareButtonsModule
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyCWBFBPsc5nHelid5Dop0o-TTmeRTscpac'
    // }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
