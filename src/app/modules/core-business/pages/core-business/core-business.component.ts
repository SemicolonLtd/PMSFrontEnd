import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { CoreBusinessService } from '../../services/core-business.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MetaService } from 'src/app/core/services/meta.service';

@Component({
    selector: 'app-core-business',
    templateUrl: './core-business.component.html',
    styleUrls: ['./core-business.component.scss']
})
export class CoreBusinessComponent implements OnInit, OnDestroy {

    searchTitle = this.translateService.instant('Search.OurCoreBusiness')
    coreList: any[] = [];
    businessCoreList: any[] = [];
    loading = false;
    searchMode = false;
    searchQuery = '';
    pageSize = 10;
    paginationData: any;
    selectedBusinessSlug = '';
    subscription = new Subscription();
    lang = environment.lang

    constructor(
        private coreBusinessService: CoreBusinessService,
        private translateService: TranslateService,
        private renderer: Renderer2,
        private route: ActivatedRoute,
        private metaService: MetaService
    ) { }

    ngOnInit(): void {
        this.handleMetaTags();
        this.getBusinessSlugFromParams();
    }

    getBusinessSlugFromParams(): void {
        this.route.params.subscribe((params: any) => {
            if (params['slug']) {
                this.selectedBusinessSlug = params['slug'];
                this.getCoreList();
            }
        });
    }

    scrollToDiv(itemSlug: string): void {
        setTimeout(() => {
        const element = this.renderer.selectRootElement(`#${itemSlug}`, true);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        }, 0);
    }

    getCoreList(): void {
        this.loading = true;
        const API = this.searchMode ?
            this.coreBusinessService.searchForBusiness(this.searchQuery, this.pageSize) :
            this.coreBusinessService.getCoreBusinessMenus(this.pageSize);
        this.subscription.add(
            API.subscribe({
                next: (res: any) => {
                    if (res?.status == 200) {
                        this.coreList = res?.data?.data;
                        this.coreList.map(
                            (core) => {
                                if (core.slug === this.selectedBusinessSlug) {
                                    this.businessCoreList = core.business
                                }
                            }
                        )
                        console.log(this.coreList);
                        
                    }
                    this.loading = false;
                },
                error: (err: any) => {
                    this.loading = false;
                },
                // complete: () => {
                //     if (this.selectedBusinessSlug) {
                //         this.scrollToDiv(this.selectedBusinessSlug);
                //         this.selectedBusinessSlug = '';  // reset the selected slug after scrolling to it
                //     }
                // }
            })
        );
    }

    searchForBusiness(query: string): void {
        if (query?.length) {
            this.searchMode = true;
            this.searchQuery = query;
        } else {
            this.searchMode = false;
            this.searchQuery = '';
        }
        this.coreList = [];
        this.getCoreList();
    }

    loadMore(): void {
        this.pageSize += 10;
        this.getCoreList();
    }

    handleMetaTags(): void {
        const content: any = {
          title: 'Navbar.OurBusiness',
          useTranslation: true,
          description: 'Core Business Discription',
          keywords: 'Core Business',
          image: `${environment.websiteUrl}/assets/images/global/logo.svg`,
          // url: `${environment.websiteUrl}news/news-view/${encodeURIComponent(this.projectData.slug)}`
          url: `${environment.websiteUrl}/core-business`
        };
        this.metaService.createMetaData(content);
      }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
