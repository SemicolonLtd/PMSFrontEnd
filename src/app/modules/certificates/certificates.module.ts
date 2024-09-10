import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificatesRoutingModule } from './certificates-routing.module';
import { CertificatesComponent } from './pages/certificates/certificates.component';

import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CertificatesComponent,
  ],
  imports: [
    CommonModule,
    CertificatesRoutingModule,
    ImageModule,
    ButtonModule,
    TranslateModule
  ]
})
export class CertificatesModule { }
