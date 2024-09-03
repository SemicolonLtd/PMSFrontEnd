import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './pages/projects/projects.component';
import {SharedModule } from "../../shared/shared.module";
import { ButtonModule } from 'primeng/button';

import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectCardComponent,
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProjectsRoutingModule,
    ButtonModule,
    SelectButtonModule,
    FormsModule,
    GalleriaModule,
    CarouselModule
]
})
export class ProjectsModule { }
