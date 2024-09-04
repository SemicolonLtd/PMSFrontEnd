import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificatesRoutingModule } from './certificates-routing.module';
import { CertificatesComponent } from './pages/certificates/certificates.component';

import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [
    CertificatesComponent,
  ],
  imports: [
    CommonModule,
    CertificatesRoutingModule,
    ImageModule
  ]
})
export class CertificatesModule { }
