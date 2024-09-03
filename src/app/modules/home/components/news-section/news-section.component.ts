import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-news-section',
  templateUrl: './news-section.component.html',
  styleUrls: ['./news-section.component.scss']
})
export class NewsSectionComponent implements OnInit, OnDestroy {

  bigCardNews: any
  smallCardsNews: any[] = []
  newsData: any[] = [
    {
      title: 'Harnessing the Power of the Seas for Sustainable Energy Solutions',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor',
      image: '../../../../../assets/images/home/core-front.webp',
      date: '2022-01-01',
      type: 'offshore'
    },
    {
      title: 'Harnessing the Power of the Seas for Sustainable Energy Solutions',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor',
      image: '../../../../../assets/images/home/project-2.jpg',
      date: '2022-01-01',
      type: 'Oil & Gas'
    },
    {
      title: 'Harnessing the Power of the Seas for Sustainable Energy Solutions',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor',
      image: '../../../../../assets/images/home/project-3.jpg',
      date: '2022-01-01',
      type: 'offshore'
    },
    {
      title: 'Harnessing the Power of the Seas for Sustainable Energy Solutions',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor',
      image: '../../../../../assets/images/home/project-4.jpg',
      date: '2022-01-01',
      type: 'Marine'
    },

  ];
  newsCategories: any[] = [];
  selectedCategoryId: any;
  loading = false;
  subscriptions = new Subscription();

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.bigCardNews = this.newsData[0];
    this.smallCardsNews = this.newsData.slice(1, 4);
    // this.getNewsCategories();
  }

  
  getNewsCategories(): void {
    // this.loading = true;
    this.subscriptions.add(
      this.homeService.getNewsCategories().subscribe({
        next: (res: any) => {
          // this.loading = false
          this.newsCategories = res;
          this.selectedCategoryId = this.newsCategories[0].id;
          // this.getNewsData();
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
          this.loading = false
          this.newsData = res;
          this.bigCardNews = this.newsData[0];
          this.smallCardsNews = this.newsData.slice(1, 4);
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
