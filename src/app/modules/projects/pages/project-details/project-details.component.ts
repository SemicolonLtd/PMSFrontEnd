import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectsService } from '../../services/projects.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer, Meta, SafeHtml } from '@angular/platform-browser';
import { MetaService } from 'src/app/core/services/meta.service';

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
  projectImages: string[] = [];
  similarProjectsData: any[] = [];
  similarProjectsLoading = false
  slug: string = '';
  typeId: any;
  loading = false;
  breadcrumbItems = [
    {
      name: this.translateService.instant('Navbar.Projects'),
      link: '/projects'
    }
  ];
  subscriptions = new Subscription();
  websiteUrl = environment.websiteUrl;
  showDesc: boolean = false;

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private router: Router,
    private meta: Meta,
    private sanitizer: DomSanitizer,
    private metaService: MetaService
  ) { }

  ngOnInit(): void {
    this.getProjectSlugFromParams();
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  
  getProjectSlugFromParams(): void {
    this.route.params.subscribe((params: any) => {
      if(params['slug']) {
        this.slug = params['slug'];
        this.breadcrumbItems = []
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
              ...this.projectData.media
              // {
              //   image: this.projectData.image
              // }
            ];
            this.projectImages = this.projectData.media.map((image: any) => image.image);
            this.breadcrumbItems.push(
              {
                name: this.projectData?.menu,
                link: '/projects/'
              },
              {
              name: this.projectData?.title,
              link: '/projects/details/' + this.projectData?.slug
            })
            this.getSimilarProjects();
            this.handleMetaTags();
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

  // onLinkOpened(event: any): void {
  //   this.handleMetaTags();
  // }

  handleMetaTags(): void {
    const content: any = {
      title: this.projectData.title,
      useTranslation: false,
      description: this.projectData.short,
      keywords: this.projectData.short,
      image: this.projectData.image,
      // url: `${environment.websiteUrl}news/news-view/${encodeURIComponent(this.projectData.slug)}`
      url: `${environment.websiteUrl}/projects/details/${this.projectData.slug}`
    };
    this.metaService.createMetaData(content);
  }

  onShowDesc(): void {
    this.showDesc = !this.showDesc;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
