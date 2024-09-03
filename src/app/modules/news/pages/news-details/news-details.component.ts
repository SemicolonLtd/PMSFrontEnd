import { Component } from '@angular/core';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent {
  responsiveOptions: any[] = [
    // {
    //   breakpoint: '2000px',
    //   numVisible: 4
    // },
    {
        breakpoint: '1024px',
        numVisible: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];

  images: any[]  = [
    {
      itemImageSrc: 'assets/images/home/header-1.jpg',
      thumbnailImageSrc: 'assets/images/home/header-1.jpg',
      alt: 'Description for Image 1',
      title: 'Title 1'
  },
  {
    itemImageSrc: 'assets/images/home/header-2.png',
    thumbnailImageSrc: 'assets/images/home/header-2.png',
    alt: 'Description for Image 1',
    title: 'Title 1'
  },
  {
    itemImageSrc: 'assets/images/home/header-3.jpg',
    thumbnailImageSrc: 'assets/images/home/header-3.jpg',
    alt: 'Description for Image 1',
    title: 'Title 1'
  },
  {
    itemImageSrc: 'assets/images/home/header-2.png',
    thumbnailImageSrc: 'assets/images/home/header-2.png',
    alt: 'Description for Image 1',
    title: 'Title 1'
  },
  {
    itemImageSrc: 'assets/images/home/header-3.jpg',
    thumbnailImageSrc: 'assets/images/home/header-3.jpg',
    alt: 'Description for Image 1',
    title: 'Title 1'
  },
  {
    itemImageSrc: 'assets/images/home/header-3.jpg',
    thumbnailImageSrc: 'assets/images/home/header-3.jpg',
    alt: 'Description for Image 1',
    title: 'Title 1'
  },
  {
    itemImageSrc: 'assets/images/home/header-2.png',
    thumbnailImageSrc: 'assets/images/home/header-2.png',
    alt: 'Description for Image 1',
    title: 'Title 1'
  },
  ]

  newsData: any[] = [
    {
      id:1,
      title: 'Harnessing the Power of the Seas for Sustainable Energy Solutions',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor',
      image: '../../../../../assets/images/home/core-front.webp',
      date: '2022-01-01',
      type: 'offshore'
    },
    {
      id:1,
      title: 'Harnessing the Power of the Seas for Sustainable Energy Solutions',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor',
      image: '../../../../../assets/images/home/project-2.jpg',
      date: '2022-01-01',
      type: 'Oil & Gas'
    },
    {
      id:1,
      title: 'Harnessing the Power of the Seas for Sustainable Energy Solutions',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor',
      image: '../../../../../assets/images/home/project-3.jpg',
      date: '2022-01-01',
      type: 'offshore'
    },
    {
      id:1,
      title: 'Harnessing the Power of the Seas for Sustainable Energy Solutions',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor',
      image: '../../../../../assets/images/home/project-4.jpg',
      date: '2022-01-01',
      type: 'Marine'
    },
    {
      id:1,
      title: 'Harnessing the Power of the Seas for Sustainable Energy Solutions',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor',
      image: '../../../../../assets/images/home/project-2.jpg',
      date: '2022-01-01',
      type: 'Oil & Gas'
    },
    {
      id:1,
      title: 'Harnessing the Power of the Seas for Sustainable Energy Solutions',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor',
      image: '../../../../../assets/images/home/project-3.jpg',
      date: '2022-01-01',
      type: 'offshore'
    },
    {
      id:1,
      title: 'Harnessing the Power of the Seas for Sustainable Energy Solutions',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctorLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor',
      image: '../../../../../assets/images/home/project-4.jpg',
      date: '2022-01-01',
      type: 'Marine'
    },
    
  ]

}
