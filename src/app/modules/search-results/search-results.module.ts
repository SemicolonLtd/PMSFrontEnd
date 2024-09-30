import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultsRoutingModule } from './search-results-routing.module';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
// import { IconFieldModule } from 'primeng/iconfield';
// import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { TabViewModule } from 'primeng/tabview';
import { SearchResultsCardComponent } from './components/search-results-card/search-results-card.component';
import { CardModule } from 'primeng/card';
import { SharedModule } from "../../shared/shared.module";
import { EmptyStateComponent } from "../../shared/components/empty-state/empty-state.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SearchResultsComponent,
    SearchResultsCardComponent
  ],
  imports: [
    CommonModule,
    SearchResultsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // IconFieldModule,
    // InputIconModule,
    InputTextModule,
    ButtonModule,
    TranslateModule,
    TabViewModule,
    CardModule,
    SharedModule,
    EmptyStateComponent
]
})
export class SearchResultsModule { }
