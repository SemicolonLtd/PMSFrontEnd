import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CoreBusinessSectionComponent } from './components/core-business-section/core-business-section.component';
import { RecentProjectsComponent } from './components/recent-projects/recent-projects.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { NewsSectionComponent } from './components/news-section/news-section.component';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { CountUpModule } from 'ngx-countup';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    CoreBusinessSectionComponent,
    RecentProjectsComponent,
    NewsSectionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonModule,
    RouterModule,
    TabViewModule,
    CardModule,
    CountUpModule,
    TranslateModule,
    SharedModule
]
})
export class HomeModule { }
