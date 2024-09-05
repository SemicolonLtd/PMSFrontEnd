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
    this.getSlidersData();
    this.getStatisticsData();
  }

  getSlidersData(): void {
    this.loading = true;
    this.subscriptions.add(
      this.homeService.getHeaderSliderData().subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.slidersData = res?.data?.data;
          }
          this.loading = false
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
          if(res?.status == 200) {
            this.statistics = res?.data;
          }
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
