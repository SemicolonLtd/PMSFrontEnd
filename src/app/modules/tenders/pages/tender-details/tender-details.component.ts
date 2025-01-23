import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { MetaService } from 'src/app/core/services/meta.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TendersService } from '../../services/tenders.service';

@Component({
  selector: 'app-tender-details',
  templateUrl: './tender-details.component.html',
  styleUrls: ['./tender-details.component.scss']
})
export class TenderDetailsComponent implements OnInit, OnDestroy {
  websiteUrl = environment.websiteUrl;

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
        numVisible: 2
    }
  ];

  tenderData: any = {};
  similarTendersData: any[] = [];
  similarTendersLoading = false;
  slug: string = '';
  typeId: any;
  loading = false;
  breadcrumbItems = [
    {
      name: this.translateService.instant('Footer.Tenders'),
      link: '/tenders'
    }
  ];
  subscriptions = new Subscription();

  constructor(
    private tendersService: TendersService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private metaService: MetaService
  ) { }

  ngOnInit(): void {
    this.getTenderSlugFromParams();
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getTenderSlugFromParams(): void {
    this.route.params.subscribe((params: any) => {
      if(params['slug']) {
        this.slug = params['slug'];
        this.breadcrumbItems = []
        this.getTenderDetails();
      } else {
        this.router.navigateByUrl('/tenders');
      }
    });
  }

  getTenderDetails(): void {
    this.loading = true;
    this.subscriptions.add(
      this.tendersService.getTenderDetails(this.slug).subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.tenderData = res?.data;
            this.tenderData.media = [
              // ...this.tenderData.media,
              {
                image: this.tenderData.image
              }
            ];
            this.breadcrumbItems.push(
              {
                name: this.tenderData?.menu,
                link: '/tenders/'
              },
              {
              name: this.tenderData?.title,
              link: '/tenders/details/' + this.tenderData?.slug
            })
            this.handleMetaTags();
            this.getSimilarEvents();
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

  getSimilarEvents(): void {
    this.similarTendersLoading = true;
    this.subscriptions.add(
      this.tendersService.getAllTenders(10).subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.similarTendersData = res?.data?.data;
          }
          this.similarTendersLoading = false;
        },
        error: (err: any) => {
          console.log(err);
          this.similarTendersLoading = false;
        }
      })
    );
  }

  // onLinkOpened(event: any): void {
  //   this.handleMetaTags();
  // }

  handleMetaTags(): void {
    const content: any = {
      title: this.tenderData.title,
      useTranslation: false,
      description: this.tenderData.short,
      keywords: this.tenderData.short,
      image: this.tenderData.image,
      // url: `${environment.websiteUrl}news/news-view/${encodeURIComponent(this.tenderData.slug)}`
      url: `${environment.websiteUrl}/events/details/${this.tenderData.slug}`
    };
    this.metaService.createMetaData(content);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
