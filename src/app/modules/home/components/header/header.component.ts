import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  slidersData:any[] = [];
  statistics:any
  subscriptions = new Subscription()
  
  ngOnInit(): void {
    this.slidersData = [
      {
        image:'assets/images/home/header-1.jpg',
        title: 'Petroleum Marine Services',
        desc: `PMS, is a leading Egyptian EPCI offshore construction company, 
        established in 2001 under  the auspices of the Egyptian General
        Petroleum Corporation (EGPC), with almost four decades  of 
        experience as a continuation of its previous entity as the Marine`,
        link: 'www.google.com',
      },
      {
        image:'assets/images/home/header-2.png',
        title: 'Petroleum Marine Services',
        desc: `PMS, is a leading Egyptian EPCI offshore construction company, 
        established in 2001 under  the auspices of the Egyptian General
        Petroleum Corporation (EGPC), with almost four decades  of 
        experience as a continuation of its previous entity as the Marine`,
        link: 'www.google.com',
      },
      {
        image:'assets/images/home/header-3.jpg',
        title: 'Petroleum Marine Services',
        desc: `PMS, is a leading Egyptian EPCI offshore construction company, 
        established in 2001 under  the auspices of the Egyptian General
        Petroleum Corporation (EGPC), with almost four decades  of 
        experience as a continuation of its previous entity as the Marine`,
        link: 'www.google.com',
      },
      {
        image:'assets/images/home/header-1.jpg',
        title: 'Petroleum Marine Services',
        desc: `PMS, is a leading Egyptian EPCI offshore construction company, 
        established in 2001 under  the auspices of the Egyptian General
        Petroleum Corporation (EGPC), with almost four decades  of 
        experience as a continuation of its previous entity as the Marine`,
        link: 'www.google.com',
      },
      {
        image:'assets/images/home/header-3.jpg',
        title: 'Petroleum Marine Services',
        desc: `PMS, is a leading Egyptian EPCI offshore construction company, 
        established in 2001 under  the auspices of the Egyptian General
        Petroleum Corporation (EGPC), with almost four decades  of 
        experience as a continuation of its previous entity as the Marine`,
        link: 'www.google.com',
      }
    ]
    this.statistics = {
      Technical: 1250,
      Projects: 102,
      Engineers: 241
    }
  }

  getSlidersData(): void {

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
