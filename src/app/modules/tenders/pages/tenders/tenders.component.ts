import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { MetaService } from 'src/app/core/services/meta.service';
import { environment } from 'src/environments/environment';
import { TendersService } from '../../services/tenders.service';

@Component({
  selector: 'app-tenders',
  templateUrl: './tenders.component.html',
  styleUrls: ['./tenders.component.scss']
})
export class TendersComponent implements OnInit, OnDestroy {
  searchTitle = this.translateService.instant('Search.OurTenders')
  barTitle = this.translateService.instant('Tenders.TenderAndActivities')
  pageTopEvent: any;
  topEventLoading = false;
  tendersList: any[] = [];
  tendersLoading = false;
  pageSize = 10;
  searchMode = false;
  searchQuery = '';
  paginationData: any;
  subscriptions = new Subscription();
  schemaObj: any;
  schemaList: any[] = [];
  newsCategories: any[] = [];
  selectedIndex: any = null;
  selectedCategoryId: any;

  constructor(
    private tendersService: TendersService,
    private translateService:TranslateService,
    private metaService: MetaService

  ) { }

  ngOnInit(): void {
    this.getTendersCategories();
    this.handleMetaTags();
  }

  getTendersCategories(): void {
    // this.loading = true;
    this.subscriptions.add(
      this.tendersService.getTendersCategories().subscribe({
        next: (res: any) => {
          // this.loading = false
          if(res?.status == 200) {
            // this.newsCategories = res?.data?.data;
            // this.selectedCategoryId = this.newsCategories[0].id;
            // this.getNewsData();
            this.newsCategories = [
              {
                id: 'x',
                name: this.translateService.instant('General.All'),
              },
              ...res?.data?.data
            ];
            this.getRecentTenders();
          }
        },
        error: (err: any) => {
          // this.loading = false
        }
      })
    )
  }
  
  onSelectCategory(index: any): void {
    this.tendersList = [];
    this.selectedIndex = index;
    if(this.selectedIndex == 0) {
      this.getRecentTenders();
    } else {
      this.selectedCategoryId = this.newsCategories[index].id;
      this.getTendersData();
    }
  }

  getRecentTenders(): void {
    this.tendersLoading = true;
    this.subscriptions.add(
      this.tendersService.getAllTenders(this.pageSize).subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.tendersList = [... this.tendersList, ...res?.data?.data];
            this.paginationData = res?.data?.meta?.pagination;
          }
          this.tendersLoading = false
        },
        error: (err: any) => {
          this.tendersLoading = false
        }
      })
    )
  }

  getTendersData(): void {
    this.tendersLoading = true;
    const API = this.searchMode ? 
    this.tendersService.searchForTender(this.searchQuery, this.pageSize) :
    this.tendersService.getTendersByCategory(this.selectedCategoryId, this.pageSize)

    this.subscriptions.add(
      API.subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.tendersList = [... this.tendersList, ...res?.data?.data];
            this.paginationData = res?.data?.meta?.pagination;
            this.handleSchema()
          }
          this.tendersLoading = false
        },
        error: (err: any) => {
          this.tendersLoading = false
        }
      })
    )
  }

  searchForTenders(query: string): void {
    if (query?.length) {
      this.searchMode = true;
      this.searchQuery = query;
    } else {
      this.searchMode = false;
      this.searchQuery = '';
    }
    this.tendersList = [];
    this.getTendersData();
  }

  loadMore(): void {
    this.pageSize += 10;
    this.getTendersData();
  }

  handleMetaTags(): void {
    const content: any = {
      title: 'Footer.Tenders',
      useTranslation: true,
      description: 'Tenders Discription',
      keywords: 'Tenders',
      image: `${environment.websiteUrl}/assets/images/global/logo.svg`,
      // url: `${environment.websiteUrl}news/news-view/${encodeURIComponent(this.projectData.slug)}`
      url: `${environment.websiteUrl}/tenders`
    };
    this.metaService.createMetaData(content);
  }

  initSchemaObj(): void {
    this.schemaObj = {
      "@context": "https://schema.org",
      "@type": "Tender",
    };
  }

  handleSchema(): void {
    this.initSchemaObj();
    this.tendersList.forEach((item: any) => {
      this.schemaObj['startDate'] = item.date;
      this.schemaObj['name'] = item.title;
      this.schemaObj['description'] = item.desc;
      this.schemaObj['image'] = item.image;
      this.schemaObj['url'] = `${environment.websiteUrl}/tenders/details/${item.slug}`;
      this.schemaList.push(this.schemaObj);
      this.initSchemaObj();
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
