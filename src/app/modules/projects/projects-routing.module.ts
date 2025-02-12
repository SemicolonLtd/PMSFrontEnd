import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { TrackRecordComponent } from './pages/track-record/track-record.component';

const routes: Routes = [
  {path: '', component: ProjectsComponent},
  {path:'details/:slug', component: ProjectDetailsComponent},
  {path: 'track-record', component: TrackRecordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
