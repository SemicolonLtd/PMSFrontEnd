import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { MetaService } from 'src/app/core/services/meta.service';
import { environment } from 'src/environments/environment';
import { FleetsService } from '../../services/fleets.service';

@Component({
  selector: 'app-fleets',
  templateUrl: './fleets.component.html',
  styleUrls: ['./fleets.component.scss']
})
export class FleetsComponent implements OnInit, OnDestroy {
  pageTopFleet: any;
  fleetsList: any[] = [];
  fleetsLoading = false;
  searchMode = false;
  searchQuery = '';
  paginationData: any;
  subscriptions = new Subscription();
  schemaObj: any;
  schemaList: any[] = [];
  pageSlug = '';
  fleetsData:any
  breadcrumbItems: any[] = [];
  lang = environment.lang
  
  constructor(
    private fleetsService: FleetsService,
    private translateService:TranslateService,
    private metaService: MetaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  
    this.getPageSlug();
    this.handleMetaTags();
  }

  getPageSlug(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['slug']) {
        this.pageSlug = params['slug'];
        this.getFleetsData();
      }
    })
  }

  getFleetsData(): void {
    this.fleetsLoading = true;
    const API = this.fleetsService.getCategoryBySlug(this.pageSlug)

    this.subscriptions.add(
      API.subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.breadcrumbItems = []
            this.fleetsData = res?.data
            this.breadcrumbItems.push(
              {
                name: this.fleetsData.name,
                link: '/'
              }
            )
            this.fleetsList = res?.data?.fleets
            this.paginationData = res?.data?.meta?.pagination;
            this.handleSchema()
          }
          this.fleetsLoading = false
        },
        error: (err: any) => {
          this.fleetsLoading = false
        }
      })
    )
  }

  searchForFleets(query: string): void {
    if (query?.length) {
      this.searchMode = true;
      this.searchQuery = query;
    } else {
      this.searchMode = false;
      this.searchQuery = '';
    }
    this.fleetsList = [];
    this.getFleetsData();
  }

  // loadMore(): void {
  //   this.pageSize += 10;
  //   this.getFleetsData();
  // }

  handleMetaTags(): void {
    const content: any = {
      title: 'Fleets.Fleets',
      useTranslation: true,
      description: 'Fleets Discription',
      keywords: 'Fleets',
      image: `${environment.websiteUrl}/assets/images/global/logo.svg`,
      // url: `${environment.websiteUrl}news/news-view/${encodeURIComponent(this.projectData.slug)}`
      url: `${environment.websiteUrl}/fleets`
    };
    this.metaService.createMetaData(content);
  }

  initSchemaObj(): void {
    this.schemaObj = {
      "@context": "https://schema.org",
      "@type": "Fleet",
    };
  }

  handleSchema(): void {
    this.initSchemaObj();
    this.fleetsList.forEach((item: any) => {
      this.schemaObj['name'] = item.title;
      this.schemaObj['description'] = item.desc;
      this.schemaObj['image'] = item.image;
      this.schemaObj['url'] = `${environment.websiteUrl}/fleets/details?slug=${item.slug}`;
      this.schemaList.push(this.schemaObj);
      this.initSchemaObj();
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
