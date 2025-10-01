import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ComplaintsRoutingModule } from './complaints-routing.module';
import { ComplaintsComponent } from './pages/complaints/complaints.component';
import { AddComplaintsComponent } from './components/add-complaints/add-complaints.component';
import { GetComplaintsComponent } from './components/get-complaints/get-complaints.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha'; 
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    ComplaintsComponent,
    AddComplaintsComponent,
    GetComplaintsComponent,
  ],
  imports: [
    CommonModule,
    ComplaintsRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    ToastrModule,
    TitleCasePipe
  ]
})
export class ComplaintsModule { }
