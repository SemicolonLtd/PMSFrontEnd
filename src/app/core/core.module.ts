import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextSlicePipe } from './pipes/text-slice.pipe';



@NgModule({
  declarations: [
    TextSlicePipe
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
