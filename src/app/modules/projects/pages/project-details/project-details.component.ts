import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectsService } from '../../services/projects.service';

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
  slug: string = '';
  typeId: any;
  loading = false;
  subscriptions = new Subscription();

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProjectSlugFromParams();
  }

  getProjectSlugFromParams(): void {
    this.route.params.subscribe((params: any) => {
      console.log(params);
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
            this.getSimilarNews();
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

  getSimilarNews(): void {
    this.subscriptions.add(
      this.projectsService.getSimilarProjects(this.projectData?.slug).subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.similarProjectsData = res?.data?.data;
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
