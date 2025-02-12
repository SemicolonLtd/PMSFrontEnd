import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from '../../services/home.service';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';
import { EventsService } from 'src/app/modules/events/services/events.service';

@Component({
  selector: 'app-news-section',
  templateUrl: './news-section.component.html',
  styleUrls: ['./news-section.component.scss']
})
export class NewsSectionComponent implements OnInit, OnDestroy {
  isBrowser!: boolean;
  bigCardNews: any
  smallCardsNews: any[] = [];
  newsData: any[] = [];
  newsCategories: any[] = [];
  selectedCategoryId: any;
  loading = false;
  subscriptions = new Subscription();
  lang = environment.lang

  constructor(
    private homeService: HomeService,
    private translateService: TranslateService,
    private eventsService: EventsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
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
              ...res?.data?.data,
              // {
              //   id: 'x',
              //   name: this.translateService.instant('General.Events'),
              // },
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
    }
    // else if (index === this.newsCategories.length - 1) {
    //   this.getEventsData()
    // } 
    else {
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

  getEventsData(): void {
    this.loading = true;
    this.subscriptions.add(
      this.eventsService.getEvents(5).subscribe({
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
