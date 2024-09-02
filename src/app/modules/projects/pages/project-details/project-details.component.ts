import { Component } from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent {
  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
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

  projectsList: any[] = [
    {
      id:1,
      image: 'assets/images/home/header-2.png',
      title: 'EPICS of Early Facilites For  NEW GNN FIELD DEVELOPMENT',
      date: '20/8/2023',
    },
    {
      id:1,
      image: 'assets/images/home/header-2.png',
      title: 'EPICS of Early Facilites For  NEW GNN FIELD DEVELOPMENT',
      date: '20/8/2023',
    },
    {
      id:1,
      image: 'assets/images/home/header-2.png',
      title: 'EPICS of Early Facilites For  NEW GNN FIELD DEVELOPMENT',
      date: '20/8/2023',
    },
    {
      id:1,
      image: 'assets/images/home/header-2.png',
      title: 'EPICS of Early Facilites For  NEW GNN FIELD DEVELOPMENT',
      date: '20/8/2023',
    }
  ]

}
