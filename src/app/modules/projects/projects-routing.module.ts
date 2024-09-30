import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { ProjectsComponent } from './pages/projects/projects.component';

const routes: Routes = [
  {path: '', component: ProjectsComponent},
  {path:'details/:slug', component: ProjectDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
