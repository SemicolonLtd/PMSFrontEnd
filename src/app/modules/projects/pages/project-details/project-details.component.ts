import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectsService } from '../../services/projects.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

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

  projectData: any = {};
  similarProjectsData: any[] = [];
  similarProjectsLoading = false
  slug: string = '';
  typeId: any;
  loading = false;
  breadcrumbItems = [
    {
      name: this.translateService.instant('Navbar.Projects'),
      link: '/events'
    }
  ];
  subscriptions = new Subscription();

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProjectSlugFromParams();
  }

  getProjectSlugFromParams(): void {
    this.route.params.subscribe((params: any) => {
      if(params['slug']) {
        this.slug = params['slug'];
        this.getProjectDetails();
      } else {
        this.router.navigateByUrl('/projects');
      }
    });
  }

  getProjectDetails(): void {
    this.loading = true;
    this.subscriptions.add(
      this.projectsService.getProjectDetails(this.slug).subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.projectData = res?.data;
            this.projectData.media = [
              ...this.projectData.media,
              {
                image: this.projectData.image
              }
            ];
            this.breadcrumbItems.push({
              name: this.projectData?.title,
              link: '/projects/details/' + this.projectData?.slug
            })
            this.getSimilarProjects();
          }
          this.loading = false;
        },
        error: (err: any) => {
          console.log(err);
          this.loading = false;
        }
      })
    );
  }

  getSimilarProjects(): void {
    this.similarProjectsLoading = true;
    this.subscriptions.add(
      this.projectsService.getSimilarProjects(this.projectData?.slug).subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.similarProjectsData = res?.data?.data;
          }
          this.similarProjectsLoading = false;
        },
        error: (err: any) => {
          console.log(err);
          this.similarProjectsLoading = false;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
