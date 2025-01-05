import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ProjectsService } from 'src/app/modules/projects/services/projects.service';
import { HomeService } from '../../services/home.service';
import { environment } from './../../../../../environments/environment';

@Component({
  selector: 'app-recent-projects',
  templateUrl: './recent-projects.component.html',
  styleUrls: ['./recent-projects.component.scss']
})
export class RecentProjectsComponent implements OnInit, OnDestroy {
  isBrowser!: boolean;
  projectsData: any[] = [];
  loading = false;
  subscriptions = new Subscription();
  bigCardNews: any
  smallCardsNews: any[] = [];
  lang = environment.lang
  pageSize = 5;
  selectedType: string = 'all';
  projectCategories:any
  constructor(
    private homeService: HomeService,
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private translateService:TranslateService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    // this.getProjectsData();
    this.translateService.get([
      'General.All',
      'Projects.RecentProjects',
      'Projects.TrackRecord',
      'Projects.MegaProjects'
    ]).subscribe(translations => {
      this.projectCategories = [
        { name: translations['General.All'], value: 'all' },
        { name: translations['Projects.RecentProjects'], value: 'recent-projects' },
        { name: translations['Projects.MegaProjects'], value: 'mega-projects' },
        { name: translations['Projects.TrackRecord'], value: 'completed-projects' }
      ];
    });
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.getProjectsDataByType();
  }

  // getProjectsData(): void {
  //   this.loading = true;
  //   this.subscriptions.add(
  //     this.homeService.getRecentProjects().subscribe({
  //       next: (res: any) => {
  //         if(res?.status == 200) {
  //           this.projectsData = res?.data?.data;
  //           this.bigCardNews = this.projectsData[0];
  //           this.smallCardsNews = this.projectsData.slice(1, 5)
  //         }
  //         this.loading = false;
  //       },
  //       error: (err: any) => {
  //         this.loading = false
  //       }
  //     })
  //   )
  // }

  getProjectsDataByType(): void {
    this.loading = true;
    let type = this.selectedType;
    if(type == 'recent-projects') {
      type = 'completed-projects'
    } else if(type == 'mega-projects') {
      type = 'mega-projects'
    } else if (type == 'completed-projects') {
      type = 'recent-projects'
      this.router.navigateByUrl('projects/track-record');
    }
    const API = 
    this.selectedType === 'all' ?  
    this.homeService.getRecentProjects() : 
    this.projectsService.getProjectsByType(type, this.pageSize)

    this.subscriptions.add(
      API.subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            if(this.selectedType === 'all') {
              this.projectsData = [... this.projectsData, ...res?.data?.data];
            // } else if (type === 'recent-projects') {
              // this.projectsData = Object.values(res?.data?.data).flat();
              // console.log(this.projectsData);
              
              // this.projectsData = this.projectsData.map((project: any) => {
              //   project.image = 'assets/images/global/no-project-image.png';
              //   return project;
              // });
            } else {
              this.projectsData = [... this.projectsData, ...res?.data?.data];
            }
            this.bigCardNews = this.projectsData[0];
            this.smallCardsNews = this.projectsData.slice(1, 5);
          }
          this.loading = false
        },
        error: (err: any) => {
          this.loading = false
        }
      })
    )
  }

  onSelectCategory(category: any): void {
    console.log(category);
    
    this.selectedType = category;
    this.projectsData = [];
    this.getProjectsDataByType();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
