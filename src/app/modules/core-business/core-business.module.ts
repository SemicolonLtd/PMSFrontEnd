import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreBusinessRoutingModule } from './core-business-routing.module';
import { CoreBusinessComponent } from './pages/core-business/core-business.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccordionModule } from 'primeng/accordion';
import { CoreBusinessDetailsComponent } from './pages/core-business-details/core-business-details.component';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';

@NgModule({
  declarations: [
    CoreBusinessComponent,
    CoreBusinessDetailsComponent
  ],
  imports: [
    CommonModule,
    CoreBusinessRoutingModule,
    RouterModule,
    SharedModule,
    AccordionModule,
    CarouselModule,
    GalleriaModule,
    SharedModule
  ]
})
export class CoreBusinessModule { }
