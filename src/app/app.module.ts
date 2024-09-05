import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';


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
    HttpClientModule
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
