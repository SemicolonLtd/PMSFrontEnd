import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  bigCardNews:any
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
    
  ]


  ngOnInit(): void {
    this.bigCardNews = this.newsData[0]
    this.smallCardsNews = this.newsData.slice(1, 4)
  }
}
