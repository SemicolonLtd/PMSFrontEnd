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

@NgModule({
  declarations: [
    NavbarComponent,
    NavbarDetailsComponent,
    FooterComponent,
    SearchComponent,
    CenterBarComponent
  ],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    SidebarModule,
    ButtonModule,
    InputTextModule
  ],
  exports: [
    NavbarComponent,
    NavbarDetailsComponent,
    FooterComponent,
    SearchComponent,
    CenterBarComponent
  ]
})
export class SharedModule { }
