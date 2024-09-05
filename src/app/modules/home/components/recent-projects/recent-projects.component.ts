import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-recent-projects',
  templateUrl: './recent-projects.component.html',
  styleUrls: ['./recent-projects.component.scss']
})
export class RecentProjectsComponent implements OnInit, OnDestroy {

  projectsData: any[] = [];
  loading = false;
  subscriptions = new Subscription();

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
