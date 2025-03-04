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
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { EmptyStateComponent } from "../../shared/components/empty-state/empty-state.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ImageModule } from 'primeng/image';
import { CoreBusinessCategoryComponent } from './pages/core-business-category/core-business-category.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CoreBusinessComponent,
    CoreBusinessDetailsComponent,
    CoreBusinessCategoryComponent
  ],
  imports: [
    CommonModule,
    CoreBusinessRoutingModule,
    RouterModule,
    SharedModule,
    SelectButtonModule,
    AccordionModule,
    FormsModule,
    CarouselModule,
    GalleriaModule,
    SharedModule,
    TranslateModule,
    ButtonModule,
    EmptyStateComponent,
    FontAwesomeModule,
    ShareButtonsModule,
    ImageModule
]
})
export class CoreBusinessModule { }
