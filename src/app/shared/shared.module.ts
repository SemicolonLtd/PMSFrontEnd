import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';

import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from 'primeng/sidebar';
import { NavbarDetailsComponent } from './components/navbar-details/navbar-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { InputTextModule } from 'primeng/inputtext';
import { CenterBarComponent } from './components/center-bar/center-bar.component';
import { RouterModule } from '@angular/router';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { LottieModule } from 'ngx-lottie';
import { LoadingComponent } from './components/loading/loading.component';
// import { IconFieldModule } from 'primeng/iconfield';
// import { InputIconModule } from 'primeng/inputicon';

export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    NavbarComponent,
    NavbarDetailsComponent,
    FooterComponent,
    SearchComponent,
    CenterBarComponent,
    ProjectCardComponent,
    EventCardComponent,
    LoadingComponent
  ],
  imports: [
  CommonModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    SidebarModule,
    ButtonModule,
    InputTextModule,
    RouterModule,
    TranslateModule,
    LottieModule.forRoot({ player: playerFactory }),
    // IconFieldModule,
    // InputIconModule
  ],
  exports: [
    NavbarComponent,
    NavbarDetailsComponent,
    FooterComponent,
    SearchComponent,
    CenterBarComponent,
    ProjectCardComponent,
    EventCardComponent,
    LoadingComponent

  ]
})
export class SharedModule { }
