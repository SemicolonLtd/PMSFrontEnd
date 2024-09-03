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
    this.projectsData = [
      {
        id: 1,
        image: '../../../../../assets/images/home/project-1.jpg',
        title: 'Harnessing the Power of the Seas for Sustainable Energy Solutions 1',
        text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet ',
      },
      {
        id: 1,
        image: '../../../../../assets/images/home/project-2.jpg',
        title: 'Harnessing the Power of the Seas for Sustainable Energy Solutions 2',
        text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet ',
      },
      {
        id: 1,
        image: '../../../../../assets/images/home/project-3.jpg',
        title: 'Harnessing the Power of the Seas for Sustainable Energy Solutions 3',
        text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet ',
      },
      {
        id: 1,
        image: '../../../../../assets/images/home/project-2.jpg',
        title: 'Harnessing the Power of the Seas for Sustainable Energy Solutions 4',
        text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet ',
      },
      {
        id: 1,
        image: '../../../../../assets/images/home/project-4.jpg',
        title: 'Harnessing the Power of the Seas for Sustainable Energy Solutions 5',
        text: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet ',
      },
    ]
    // this.getProjectsData();
  }

  getProjectsData(): void {
    this.loading = true;
    this.subscriptions.add(
      this.homeService.getRecentProjects().subscribe({
        next: (res: any) => {
          this.loading = false
          this.projectsData = res
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
