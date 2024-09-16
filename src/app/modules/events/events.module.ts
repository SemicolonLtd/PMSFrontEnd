import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule } from "../../shared/shared.module";
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { EventsComponent } from './pages/events/events.component';
import { EventDetailsComponent } from './pages/events-details/event-details.component';
import { EventsRoutingModule } from './events-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { EmptyStateComponent } from "../../shared/components/empty-state/empty-state.component";


@NgModule({
  declarations: [
    EventsComponent,
    EventDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EventsRoutingModule,
    ButtonModule,
    SelectButtonModule,
    FormsModule,
    GalleriaModule,
    CarouselModule,
    TranslateModule,
    EmptyStateComponent
]
})
export class EventsModule { }
