import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { MetaService } from 'src/app/core/services/meta.service';
import { environment } from 'src/environments/environment';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
  searchTitle = this.translateService.instant('Search.OurNews')
  isBrowser!: boolean;
  bigCardNews: any[] = [];
  pageSize = 10;
  smallCardsNews: any[] = [];
  newsData: any[] = [];
  newsCategories: any[] = [];
  selectedCategoryId: any;
  loading = false;
  paginationData: any;
  searchMode = false;
  searchQuery = '';
  selectedIndex: any = null;
  subscriptions = new Subscription();

  constructor(
    private newsService: NewsService,
    private translateService:TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private metaService: MetaService
  ) { }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.getNewsCategories();
  }

  getNewsCategories(): void {
    // this.loading = true;
    this.subscriptions.add(
      this.newsService.getNewsCategories().subscribe({
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
            this.getRecentNews();
          }
        },
        error: (err: any) => {
          // this.loading = false
        }
      })
    )
  }

  getNewsData(): void {
    this.loading = true;
    const API = this.searchMode ? 
    this.newsService.searchForNews(this.searchQuery, this.pageSize) :
    this.newsService.getNews(this.selectedCategoryId, this.pageSize) ;

    this.subscriptions.add(
      API.subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.newsData = [... this.newsData, ...res?.data?.data];
            this.paginationData = res?.data?.meta?.pagination;
            this.bigCardNews = this.newsData?.filter((card: any) => card.big_card == true);
            this.smallCardsNews = this.newsData?.filter((card: any) => card.big_card == false);
            this.handleMetaTags()
          }
          this.loading = false
        },
        error: (err: any) => {
          this.loading = false
        }
      })
    )
  }

  onSelectCategory(index: any): void {
    this.newsData = [];
    this.bigCardNews = [];
    this.smallCardsNews = [];
    this.selectedIndex = index;
    if(this.selectedIndex == 0) {
      this.getRecentNews();
    } else {
      this.selectedCategoryId = this.newsCategories[index].id;
      this.getNewsData();
    }
  }

  loadMore(): void {
    this.pageSize += 10;
    if(this.selectedIndex == 0) {
      this.getRecentNews();
    } else {
      this.getNewsData();
    }
  }

  searchForNews(query: string): void {
    this.newsData = [];
    this.bigCardNews = [];
    this.smallCardsNews = [];
    if (query?.length) {
      this.searchMode = true;
      this.searchQuery = query;
      this.selectedIndex = null;
      this.getNewsData();
    } else {
      this.searchMode = false;
      this.searchQuery = '';
      this.selectedIndex = 0;
      this.getRecentNews();
    }
  }

  getRecentNews(): void {
    this.loading = true;
    this.subscriptions.add(
      this.newsService.getAllNews(this.pageSize).subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.newsData = [... this.newsData, ...res?.data?.data];
            this.paginationData = res?.data?.meta?.pagination;
            this.bigCardNews = this.newsData?.filter((card: any) => card.big_card == true);
            this.smallCardsNews = this.newsData?.filter((card: any) => card.big_card == false);
          }
          this.loading = false
        },
        error: (err: any) => {
          this.loading = false
        }
      })
    )
  }

  handleMetaTags(): void {
    const content: any = {
      title: 'Navbar.News',
      useTranslation: true,
      description: 'News Discription',
      keywords: 'News',
      image: `${environment.websiteUrl}/assets/images/global/logo.svg`,
      // url: `${environment.websiteUrl}news/news-view/${encodeURIComponent(this.projectData.slug)}`
      url: `${environment.websiteUrl}/news`
    };
    this.metaService.createMetaData(content);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
