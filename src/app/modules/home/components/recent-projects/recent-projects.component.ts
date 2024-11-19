import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from '../../services/home.service';
import { environment } from './../../../../../environments/environment';

@Component({
  selector: 'app-recent-projects',
  templateUrl: './recent-projects.component.html',
  styleUrls: ['./recent-projects.component.scss']
})
export class RecentProjectsComponent implements OnInit, OnDestroy {

  projectsData: any[] = [];
  loading = false;
  subscriptions = new Subscription();
  bigCardNews: any
  smallCardsNews: any[] = [];
  lang = environment.lang
  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.getProjectsData();
  }

  getProjectsData(): void {
    this.loading = true;
    this.subscriptions.add(
      this.homeService.getRecentProjects().subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.projectsData = res?.data?.data;
            this.bigCardNews = this.projectsData[0];
            this.smallCardsNews = this.projectsData.slice(1, 5)
          }
          this.loading = false;
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
