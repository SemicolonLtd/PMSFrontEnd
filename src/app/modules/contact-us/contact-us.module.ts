import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { InputTextModule } from 'primeng/inputtext';

import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from "../../shared/shared.module";
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    InputTextModule,
    FloatLabelModule,
    InputTextareaModule,
    ButtonModule,
    SharedModule,
TranslateModule

]
})
export class ContactUsModule { }
