import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from "../../shared/shared.module";
import { StaticRoutingModule } from './static-routing.module';
import { ContentComponent } from './pages/content/content.component';
import { EmptyStateComponent } from "../../shared/components/empty-state/empty-state.component";
import { TranslateModule } from '@ngx-translate/core';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';

@NgModule({
  declarations: [
    ContentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StaticRoutingModule,
    EmptyStateComponent,
    TranslateModule,
    ShareButtonsModule
]
})
export class StaticModule { }
