import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../../../../environments/environment';

@Component({
  selector: 'app-search-results-card',
  templateUrl: './search-results-card.component.html',
  styleUrls: ['./search-results-card.component.scss']
})
export class SearchResultsCardComponent {
  @Input() card:any;
  @Input() type!: 'PROJECT' | 'NEWS' | 'CORE-BUSINESS' | 'EVENTS' | 'PAGES';
  // lang = environment.lang
  constructor(private router: Router){}

  onClick(): void {
    switch(this.type) {
      case 'PROJECT':
        this.router.navigate(['/projects/details', this.card.slug]);
        break;
      case 'NEWS':
        this.router.navigate(['/news/details', this.card.slug]);
        break;
      case 'CORE-BUSINESS':
        this.router.navigate(['/core-business/details', this.card.slug]);
        break;
      case 'EVENTS':
        this.router.navigate(['/events/details', this.card.slug]);
        break;
      case 'PAGES':
        this.router.navigateByUrl('/content?slug=' + this.card.slug);
        break;
    }
  }
}
