import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selectedType!: string;
  fleetCategories!: any[];

  constructor(
    private fleetsService: FleetsService,
    private translateService:TranslateService,
    private metaService: MetaService,
    private route: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getFleetsCategories()
    this.getPageSlug();
    this.handleMetaTags();
  }

  getFleetsCategories(): void {
    this.fleetsLoading = true
    this.subscriptions.add(
      this.fleetsService.getFleetsCategories().subscribe({
        next: (res: any) => {
          this.fleetsLoading = false
          if(res?.status == 200) {
            this.fleetCategories = res.data.data.map(
              (item: any) => {
                return {
                  label: item.name,
                  value: item.slug
                }
              }
            )
          }
        },
        error: (err: any) => {
          this.fleetsLoading = false
        }
      })
    )
  }

  getPageSlug(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['slug']) {
        this.selectedType = params['slug'];
        this.getFleetsData();
      }
    })
  }

  getFleetsData(): void {
    this.fleetsLoading = true;
    const API = this.fleetsService.getCategoryBySlug(this.selectedType)

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

  onSelectCategory(category: any): void {
    this.pageSlug = category.value;
    this.fleetsList = [];
    this.router.navigate([], { queryParams: { lang: environment.lang, slug:category.value }, queryParamsHandling: 'merge' });
    this.getFleetsData();
  }

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
      this.schemaObj['name'] = item.name;
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
