import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
  searchTitle = this.translateService.instant('Search.OurNews')

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
  subscriptions = new Subscription();

  constructor(
    private newsService: NewsService,
    private translateService:TranslateService
  ) { }

  ngOnInit(): void {
    this.getNewsCategories();
  }

  getNewsCategories(): void {
    // this.loading = true;
    this.subscriptions.add(
      this.newsService.getNewsCategories().subscribe({
        next: (res: any) => {
          // this.loading = false
          if(res?.status == 200) {
            this.newsCategories = res?.data?.data;
            this.selectedCategoryId = this.newsCategories[0].id;
            this.getNewsData();
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
    this.selectedCategoryId = this.newsCategories[index].id;
    this.newsData = [];
    this.bigCardNews = [];
    this.smallCardsNews = [];
    this.getNewsData();
  }

  loadMore(): void {
    this.pageSize += 10;
    this.getNewsData();
  }

  searchForNews(query: string): void {
    if (query?.length) {
      this.searchMode = true;
      this.searchQuery = query;
    } else {
      this.searchMode = false;
      this.searchQuery = '';
    }
    this.newsData = [];
    this.bigCardNews = [];
    this.smallCardsNews = [];
    this.getNewsData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
