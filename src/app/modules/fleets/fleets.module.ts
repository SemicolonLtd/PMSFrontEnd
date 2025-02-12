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
import { FleetsComponent } from './pages/fleets/fleets.component';
import { FleetDetailsComponent } from './pages/fleet-details/fleet-details.component';
import { FleetsRoutingModule } from './fleets-routing.module';


@NgModule({
  declarations: [
    FleetsComponent,
    FleetDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FleetsRoutingModule,
    ButtonModule,
    SelectButtonModule,
    FormsModule,
    GalleriaModule,
    CarouselModule,
    TranslateModule,
    EmptyStateComponent,
    FontAwesomeModule,
    ShareButtonsModule,
    ImageModule
]
})
export class FleetsModule { }
