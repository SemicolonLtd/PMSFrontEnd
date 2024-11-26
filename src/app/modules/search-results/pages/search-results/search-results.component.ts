import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MetaService } from 'src/app/core/services/meta.service';
import { environment } from 'src/environments/environment';

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
        @Inject(PLATFORM_ID) private platformId: Object,
        private metaService: MetaService
    ) { }

    ngOnInit(): void {
        this.isBrowser = isPlatformBrowser(this.platformId);
        this.getSearchQueryFromParams();
    }

    getSearchQueryFromParams(): void {
        this.subscriptions.add(
            this.route.queryParams.subscribe(params => {
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
                        this.handleMetaTags()
                        this.loading = false;
                    }
                },
                error: () => {
                    this.loading = false;
                }
            })
        );
    }

    handleMetaTags(): void {
        const content: any = {
          title: 'Search.Search',
          useTranslation: true,
          description: 'Search',
          keywords: 'PMS',
          image: `${environment.websiteUrl}/assets/images/global/logo.svg`,
          // url: `${environment.websiteUrl}news/news-view/${encodeURIComponent(this.projectData.slug)}`
          url: `${environment.websiteUrl}/search-results`
        };
        this.metaService.createMetaData(content);
      }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
