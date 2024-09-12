import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-results-card',
  templateUrl: './search-results-card.component.html',
  styleUrls: ['./search-results-card.component.scss']
})
export class SearchResultsCardComponent {
  @Input() card:any;
}
