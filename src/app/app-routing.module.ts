import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: ()=> import('./modules/home/home.module').then((m)=> m.HomeModule)},
  {path: 'projects', loadChildren: ()=> import('./modules/projects/projects.module').then((m)=> m.ProjectsModule)},
  {path: 'news', loadChildren: ()=> import('./modules/news/news.module').then((m)=> m.NewsModule)},
  {path: 'core-business', loadChildren: ()=> import('./modules/core-business/core-business.module').then((m)=> m.CoreBusinessModule)},
  {path: 'events', loadChildren: ()=> import('./modules/events/events.module').then((m)=> m.EventsModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
