import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './pages/projects/projects.component';
import {SharedModule } from "../../shared/shared.module";
import { ButtonModule } from 'primeng/button';

import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { TranslateModule } from '@ngx-translate/core';
import { EmptyStateComponent } from "../../shared/components/empty-state/empty-state.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ImageModule } from 'primeng/image';
import { TrackRecordTableComponent } from './components/track-record-table/track-record-table.component';
import { ProjectTableComponent } from './components/project-table/project-table.component';
import { ImagesGridComponent } from './components/images-grid/images-grid.component';
import { TrackRecordComponent } from './pages/track-record/track-record.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectDetailsComponent,
    TrackRecordTableComponent,
    ProjectTableComponent,
    ImagesGridComponent,
    TrackRecordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectsRoutingModule,
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
export class ProjectsModule { }
