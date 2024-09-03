import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreBusinessRoutingModule } from './core-business-routing.module';
import { CoreBusinessComponent } from './pages/core-business/core-business.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CoreBusinessComponent
  ],
  imports: [
    CommonModule,
    CoreBusinessRoutingModule,
    RouterModule,
    
  ]
})
export class CoreBusinessModule { }
