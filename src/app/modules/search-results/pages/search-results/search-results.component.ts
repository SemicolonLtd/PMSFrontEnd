import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
    isBrowser!: boolean;
    searchResults: any = {};
    loading = false;
    pageSize = 1000;
    searchQuery = '';
    subscriptions = new Subscription();

    constructor(
        private searchService: SearchService,
        private route: ActivatedRoute,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit(): void {
        this.isBrowser = isPlatformBrowser(this.platformId);
        this.getSearchQueryFromParams();
    }

    getSearchQueryFromParams(): void {
        this.subscriptions.add(
            this.route.queryParams.subscribe(params => {
                console.log(params);
                this.searchQuery = params['query'] || '';
                this.getSearchResults();
            })
        );
    }

    getSearchResults(): void {
        this.loading = true;
        this.subscriptions.add(
            this.searchService.search(this.searchQuery, this.pageSize).subscribe({
                next: (res: any) => {
                    if(res?.status == 200) {
                        this.searchResults = res?.data;
                        this.loading = false;
                    }
                },
                error: () => {
                    this.loading = false;
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
