import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { MetaService } from 'src/app/core/services/meta.service';
import { FleetsService } from 'src/app/modules/fleets/services/fleets.service';
import { environment } from 'src/environments/environment';
import { CoreBusinessService } from '../../services/core-business.service';

@Component({
  selector: 'app-core-business-category',
  templateUrl: './core-business-category.component.html',
  styleUrls: ['./core-business-category.component.scss']
})
export class CoreBusinessCategoryComponent {
  loading = false;
  paginationData: any;
  subscriptions = new Subscription();
  schemaObj: any;
  schemaList: any[] = [];
  pageSlug = '';
  fleetsData:any
  lang = environment.lang
  coreCategories!: any[];
  pageSize = 10;
  subscription = new Subscription();
  coreList: any[] = [];
  selectedBusinessSlug = '';
  businessCoreList: any[] = [];
  categoryImg!: string
  categoryTitle!: string
  constructor(
    private coreBusinessService: CoreBusinessService,
    private translateService:TranslateService,
    private metaService: MetaService,
    private route: ActivatedRoute,
    private router:Router,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.getPageSlug();
    this.handleMetaTags();
  }

  getPageSlug(): void {
    this.route.params.subscribe((params) => {
      if (params['slug']) {
        this.selectedBusinessSlug = params['slug'];
        this.getCoreTabs();
      }
    })
  }

  getCoreTabs(): void {
    this.loading = true
    this.subscriptions.add(
      this.coreBusinessService.getCoreTabs().subscribe({
        next: (res: any) => {
          this.loading = false
          if(res?.status == 200) {
            this.coreList = res?.data?.data;
            this.coreCategories = this.coreList.map(
              (item: any) => {
                return {
                  label: item.title,
                  value: item.slug
                }
              }
            )
            this.coreList.map(
              (core) => {
                  if (core.slug === this.selectedBusinessSlug) {
                      this.businessCoreList = core.business;
                      this.categoryImg = core.image
                      this.categoryTitle = core.title
                  }
              }
            )
          }
        },
        error: (err: any) => {
          this.loading = false
        }
      })
    )
  }

  onSelectCategory(category: any): void {
    this.selectedBusinessSlug = category.value;
    this.businessCoreList = [];
    // this.router.navigate([], { queryParams: { lang: environment.lang, slug:category.value }, queryParamsHandling: 'merge' });
    this.coreList.map(
      (core) => {
          if (core.slug === this.selectedBusinessSlug) {
              this.businessCoreList = core.business;
              this.categoryImg = core.image
              this.categoryTitle = core.title
          }
      }
    )
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
    this.businessCoreList.forEach((item: any) => {
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
