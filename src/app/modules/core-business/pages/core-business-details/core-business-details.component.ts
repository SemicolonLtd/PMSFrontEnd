import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CoreBusinessService } from '../../services/core-business.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { MetaService } from 'src/app/core/services/meta.service';

@Component({
  selector: 'app-core-business-details',
  templateUrl: './core-business-details.component.html',
  styleUrls: ['./core-business-details.component.scss']
})
export class CoreBusinessDetailsComponent implements OnInit, OnDestroy {
  websiteUrl = environment.websiteUrl;
  responsiveOptions: any[] = [
    // {
    //   breakpoint: '2000px',
    //   numVisible: 4
    // },
    {
        breakpoint: '1024px',
        numVisible: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];

  businessData: any = {};
  businessProjectsData: any[] = [];
  businessProjectsLoading = false;
  slug: string = '';
  loading = false;
  breadcrumbItems = [
    {
      name: this.translateService.instant('Navbar.CoreBusiness'),
      link: '/core-business'
    }
  ];
  subscriptions = new Subscription();

  constructor(
    private coreBusinessService: CoreBusinessService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private metaService: MetaService
  ) { }

  ngOnInit(): void {
    this.getBusinessSlugFromParams();
  }

  getBusinessSlugFromParams(): void {
    this.route.params.subscribe((params: any) => {
      if(params['slug']) {
        this.slug = params['slug'];
        this.getBusinessDetails();
      } else {
        this.router.navigateByUrl('/core-business');
      }
    });
  }

  getBusinessDetails(): void {
    this.loading = true;
    this.subscriptions.add(
      this.coreBusinessService.getBusinessDetails(this.slug).subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.businessData = res?.data;
            this.businessData.media = [
              ...this.businessData.media,
              {
                image: this.businessData.image
              }
            ];
            this.breadcrumbItems.push({
              name: this.businessData?.title,
              link: '/core-business/details/' + this.businessData?.slug
            });
            this.handleMetaTags();
            this.getBusinessProjects();
          }
          this.loading = false;
        },
        error: (err: any) => {
          // console.log(err);
          this.loading = false;
        }
      })
    );
  }

  getBusinessProjects(): void {
    this.businessProjectsLoading = true;
    this.subscriptions.add(
      this.coreBusinessService.getBusinessProjects(this.businessData?.slug).subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.businessProjectsData = res?.data?.data;
          }
          this.businessProjectsLoading = false;
        },
        error: (err: any) => {
          this.businessProjectsLoading = false;
        }
      })
    );
  }

  // onLinkOpened(event: any): void {
  //   this.handleMetaTags();
  // }

  handleMetaTags(): void {
    const content: any = {
      title: this.businessData.title,
      useTranslation: false,
      description: this.businessData.short,
      keywords: this.businessData.short,
      image: this.businessData.image,
      // url: `${environment.websiteUrl}news/news-view/${encodeURIComponent(this.businessData.slug)}`
      url: `${environment.websiteUrl}/core-business/details/${this.businessData.slug}`
    };
    this.metaService.createMetaData(content);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
