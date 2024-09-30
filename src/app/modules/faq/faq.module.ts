import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './pages/faq/faq.component';
import { AccordionModule } from 'primeng/accordion';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    FaqComponent
  ],
  imports: [
    CommonModule,
    FaqRoutingModule,
    AccordionModule,
    ButtonModule,
    SharedModule,
    TranslateModule
  ]
})
export class FaqModule { }
