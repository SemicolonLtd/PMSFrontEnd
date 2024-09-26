import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSerializer } from '@angular/router';
import { LanguageUrlSerializer } from './core/services/language-url-serializer';

const routes: Routes = [
  {path: '', loadChildren: ()=> import('./modules/home/home.module').then((m)=> m.HomeModule)},
  {path: 'projects', loadChildren: ()=> import('./modules/projects/projects.module').then((m)=> m.ProjectsModule)},
  {path: 'content', loadChildren: ()=> import('./modules/static/static.module').then((m)=> m.StaticModule)},
  {path: 'news', loadChildren: ()=> import('./modules/news/news.module').then((m)=> m.NewsModule)},
  {path: 'core-business', loadChildren: ()=> import('./modules/core-business/core-business.module').then((m)=> m.CoreBusinessModule)},
  {path: 'events', loadChildren: ()=> import('./modules/events/events.module').then((m)=> m.EventsModule)},
  {path: 'certificates', loadChildren: ()=> import('./modules/certificates/certificates.module').then((m)=> m.CertificatesModule)},
  {path: 'contact-us', loadChildren: ()=> import('./modules/contact-us/contact-us.module').then((m)=> m.ContactUsModule)},
  {path: 'faq', loadChildren: ()=> import('./modules/faq/faq.module').then((m)=> m.FaqModule)},
  {path: 'search-results', loadChildren: ()=> import('./modules/search-results/search-results.module').then((m)=> m.SearchResultsModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
    scrollPositionRestoration: 'enabled',
})],
  exports: [RouterModule],
  // providers: [
  //   { provide: UrlSerializer, useClass: LanguageUrlSerializer }
  // ],
})
export class AppRoutingModule { }
