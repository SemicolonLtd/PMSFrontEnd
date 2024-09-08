import { Component } from '@angular/core';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent {
  responsiveOptions: any[] = [
    {
      breakpoint: '1200px',
      numVisible: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2
    },
    {
        breakpoint: '685px',
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

  eventsList: any[] = [
    {
      id:1,
      image: 'assets/images/home/event-1.jpg',
      desc: 'The body of the late US Rep. John Lewis on Sunday will make the final journey across the famous bridge The body of the late US Rep. John Lewis on Sunday will make the final journey across the famous .',
      title: 'EPICS of Early Facilites For  NEW GNN FIELD DEVELOPMENT',
      date: '20/8/2023',
    },
    {
      id:1,
      image: 'assets/images/home/event-2.jpg',
      title: 'EPICS of Early Facilites For  NEW GNN FIELD DEVELOPMENT',
      desc: 'The body of the late US Rep. John Lewis on Sunday will make the final journey across the famous bridge The body of the late US Rep. John Lewis on Sunday will make the final journey across the famous .',
      date: '20/8/2023',
    },
    {
      id:1,
      image: 'assets/images/home/event-1.jpg',
      title: 'EPICS of Early Facilites For  NEW GNN FIELD DEVELOPMENT',
      desc: 'The body of the late US Rep. John Lewis on Sunday will make the final journey across the famous bridge The body of the late US Rep. John Lewis on Sunday will make the final journey across the famous .',
      date: '20/8/2023',
    },
    {
      id:1,
      image: 'assets/images/home/event-2.jpg',
      title: 'EPICS of Early Facilites For  NEW GNN FIELD DEVELOPMENT',
      desc: 'The body of the late US Rep. John Lewis on Sunday will make the final journey across the famous bridge The body of the late US Rep. John Lewis on Sunday will make the final journey across the famous .',
      date: '20/8/2023',
    }
  ]

}
