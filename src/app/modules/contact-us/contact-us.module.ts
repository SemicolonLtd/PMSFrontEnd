import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { InputTextModule } from 'primeng/inputtext';

// import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from "../../shared/shared.module";
import { TranslateModule } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './components/map/map.component';
import { GoogleMap, GoogleMapsModule, MapMarker } from '@angular/google-maps';

@NgModule({
  declarations: [
    ContactUsComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    InputTextModule,
    // FloatLabelModule,
    InputTextareaModule,
    ButtonModule,
    SharedModule,
    TranslateModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    GoogleMap,
    MapMarker
  ]
})
export class ContactUsModule { }
