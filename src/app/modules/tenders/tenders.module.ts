import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule } from "../../shared/shared.module";
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { TranslateModule } from '@ngx-translate/core';
import { EmptyStateComponent } from "../../shared/components/empty-state/empty-state.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ImageModule } from 'primeng/image';
import { TendersRoutingModule } from './tenders-routing.module';
import { TendersComponent } from './pages/tenders/tenders.component';
import { TenderDetailsComponent } from './pages/tender-details/tender-details.component';
import { TabViewModule } from 'primeng/tabview';


@NgModule({
  declarations: [
    TendersComponent,
    TenderDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TendersRoutingModule,
    ButtonModule,
    SelectButtonModule,
    FormsModule,
    GalleriaModule,
    TabViewModule,
    CarouselModule,
    TranslateModule,
    EmptyStateComponent,
    FontAwesomeModule,
    ShareButtonsModule,
    ImageModule
]
})
export class TendersModule { }
