import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule } from "../../shared/shared.module";
import { ButtonModule } from 'primeng/button';

import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { NewsComponent } from './pages/news/news.component';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { NewsDetailsComponent } from './pages/news-details/news-details.component';
import { NewsRoutingModule } from './news-routing.module';
import { RouterModule } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NewsComponent,
    NewsCardComponent,
    NewsDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NewsRoutingModule,
    ButtonModule,
    SelectButtonModule,
    FormsModule,
    GalleriaModule,
    CarouselModule,
    RouterModule,
    TabViewModule,
    CardModule,
    TranslateModule
]
})
export class NewsModule { }
