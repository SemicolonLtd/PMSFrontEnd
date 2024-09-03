import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  slidersData: any[] = [];
  loading = false;
  statistics: any;
  subscriptions = new Subscription();

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.slidersData = [
      {
        image: 'assets/images/home/header-1.jpg',
        title: 'Petroleum Marine Services',
        desc: `PMS, is a leading Egyptian EPCI offshore construction company, 
        established in 2001 under  the auspices of the Egyptian General
        Petroleum Corporation (EGPC), with almost four decades  of 
        experience as a continuation of its previous entity as the Marine`,
        link: 'www.google.com',
      },
      {
        image: 'assets/images/home/header-2.png',
        title: 'Petroleum Marine Services',
        desc: `PMS, is a leading Egyptian EPCI offshore construction company, 
        established in 2001 under  the auspices of the Egyptian General
        Petroleum Corporation (EGPC), with almost four decades  of 
        experience as a continuation of its previous entity as the Marine`,
        link: 'www.google.com',
      },
      {
        image: 'assets/images/home/header-3.jpg',
        title: 'Petroleum Marine Services',
        desc: `PMS, is a leading Egyptian EPCI offshore construction company, 
        established in 2001 under  the auspices of the Egyptian General
        Petroleum Corporation (EGPC), with almost four decades  of 
        experience as a continuation of its previous entity as the Marine`,
        link: 'www.google.com',
      },
      {
        image: 'assets/images/home/header-1.jpg',
        title: 'Petroleum Marine Services',
        desc: `PMS, is a leading Egyptian EPCI offshore construction company, 
        established in 2001 under  the auspices of the Egyptian General
        Petroleum Corporation (EGPC), with almost four decades  of 
        experience as a continuation of its previous entity as the Marine`,
        link: 'www.google.com',
      },
      {
        image: 'assets/images/home/header-3.jpg',
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
    // this.getSlidersData();
    // this.getStatisticsData();
  }

  getSlidersData(): void {
    this.loading = true;
    this.subscriptions.add(
      this.homeService.getHeaderSliderData().subscribe({
        next: (res: any) => {
          this.loading = false
          this.slidersData = res
        },
        error: (err: any) => {
          this.loading = false
        }
      })
    )
  }

  getStatisticsData(): void {
    this.subscriptions.add(
      this.homeService.getSliderStatistics().subscribe({
        next: (res: any) => {
          this.statistics = res
        },
        error: (err: any) => {
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
