import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextSlicePipe } from './pipes/text-slice.pipe';
import { RemoveOurPipe } from './pipes/remove-our.pipe';



@NgModule({
  declarations: [
    
  
    RemoveOurPipe
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
