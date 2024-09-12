import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from '../../services/home.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-news-section',
  templateUrl: './news-section.component.html',
  styleUrls: ['./news-section.component.scss']
})
export class NewsSectionComponent implements OnInit, OnDestroy {

  bigCardNews: any
  smallCardsNews: any[] = [];
  newsData: any[] = [];
  newsCategories: any[] = [];
  selectedCategoryId: any;
  loading = false;
  subscriptions = new Subscription();

  constructor(
    private homeService: HomeService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.getNewsCategories();
  }

  
  getNewsCategories(): void {
    // this.loading = true;
    this.subscriptions.add(
      this.homeService.getNewsCategories().subscribe({
        next: (res: any) => {
          // this.loading = false
          if(res?.status == 200) {
            this.newsCategories = [
              {
                id: 'x',
                name: this.translateService.instant('General.All'),
              },
              ...res?.data?.data
            ];
            // this.selectedCategoryId = this.newsCategories[0].id;
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
    this.subscriptions.add(
      this.homeService.getNewsByCategory(this.selectedCategoryId).subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.newsData = res?.data?.data;
            this.bigCardNews = this.newsData?.filter((card: any) => card.big_card == true)[0];
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
    this.newsData = [];
    this.bigCardNews = {};
    this.smallCardsNews = [];
    if(index == 0) {
      this.getRecentNews();
    } else {
      this.selectedCategoryId = this.newsCategories[index].id;
      this.getNewsData();
    }
  }

  getRecentNews(): void {
    this.loading = true;
    this.subscriptions.add(
      this.homeService.getInHomeAllNews().subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.newsData = res?.data?.data;
            this.bigCardNews = this.newsData?.filter((card: any) => card.big_card == true)[0];
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
