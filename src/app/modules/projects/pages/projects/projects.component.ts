import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  searchTitle = this.translateService.instant('Search.OurProjects');
  barTitle = this.translateService.instant('Projects.FollowOurProjects');
  pageTopProject: any;
  topProjectLoading = false;
  stateOptions: any[] = [
    { label: this.translateService.instant('Projects.RecentProjects'), value: 'recent-projects' },
    { label: this.translateService.instant('Projects.CompletedProjects'), value: 'completed-projects' },
    { label: this.translateService.instant('Projects.MegaProjects'), value: 'mega-projects' }
  ];
  projectsList: any[] = [];
  projectsLoading = false;
  pageSize = 10;
  selectedType: string = 'completed-projects';
  searchMode = false;
  searchQuery = '';
  paginationData: any;
  subscriptions = new Subscription();

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private translateService:TranslateService
  ) { }

  ngOnInit(): void {
    this.getSelectedTypeFromParams();
    this.getTopProjectData();
  }

  getSelectedTypeFromParams(): void {
    this.route.queryParams.subscribe(params => {
      if(params['type']) {
        this.selectedType = params['type'];
      }
      this.getProjectsDataByType();
    });
  }

  getTopProjectData(): void {
    this.topProjectLoading = true;
    this.subscriptions.add(
      this.projectsService.getTopProject().subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.pageTopProject = res?.data;
          }
          this.topProjectLoading = false;
        },
        error: (err: any) => {
          this.topProjectLoading = false
        }
      })
    )
  }

  getProjectsDataByType(): void {
    this.projectsLoading = true;
    const API = this.searchMode ? 
    this.projectsService.searchForProject(this.searchQuery, this.pageSize) :
    this.projectsService.getProjectsByType(this.selectedType, this.pageSize)

    this.subscriptions.add(
      API.subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.projectsList = [... this.projectsList, ...res?.data?.data];
            this.paginationData = res?.data?.meta?.pagination;
          }
          this.projectsLoading = false
        },
        error: (err: any) => {
          this.projectsLoading = false
        }
      })
    )
  }

  searchForProjects(query: string): void {
    if (query?.length) {
      this.searchMode = true;
      this.searchQuery = query;
    } else {
      this.searchMode = false;
      this.searchQuery = '';
    }
    this.projectsList = [];
    this.getProjectsDataByType();
  }

  onSelectCategory(category: any): void {
    this.selectedType = category.value;
    this.projectsList = [];
    this.getProjectsDataByType();
  }

  loadMore(): void {
    this.pageSize += 10;
    this.getProjectsDataByType();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
  
}
