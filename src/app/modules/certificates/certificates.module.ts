import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificatesRoutingModule } from './certificates-routing.module';
import { CertificatesComponent } from './pages/certificates/certificates.component';

import { ImageModule } from 'primeng/image';
import { ButtonModule } from 'primeng/button';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CertificatesComponent,
  ],
  imports: [
    CommonModule,
    CertificatesRoutingModule,
    ImageModule,
    ButtonModule,
    SharedModule
  ]
})
export class CertificatesModule { }
