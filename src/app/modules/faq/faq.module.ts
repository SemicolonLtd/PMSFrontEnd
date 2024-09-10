import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './pages/faq/faq.component';
import { AccordionModule } from 'primeng/accordion';


@NgModule({
  declarations: [
    FaqComponent
  ],
  imports: [
    CommonModule,
    FaqRoutingModule,
    AccordionModule
  ]
})
export class FaqModule { }
