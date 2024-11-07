import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { MetaService } from 'src/app/core/services/meta.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FleetsService } from '../../services/fleets.service';

@Component({
  selector: 'app-fleet-details',
  templateUrl: './fleet-details.component.html',
  styleUrls: ['./fleet-details.component.scss']
})
export class FleetDetailsComponent implements OnInit, OnDestroy {
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
        numVisible: 1
    }
  ];

  fleetData: any = {};
  similarFleetsData: any[] = [];
  similarFleetsLoading = false;
  slug: string = '';
  typeId: any;
  loading = false;
  breadcrumbItems:any[] = [];
  subscriptions = new Subscription();

  constructor(
    private fleetsService: FleetsService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private metaService: MetaService
  ) { }

  ngOnInit(): void {
    this.getFleetSlugFromParams();
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getFleetSlugFromParams(): void {
    this.route.queryParams.subscribe((queryParams: any) => {
      if (queryParams['slug']) {
        this.slug = queryParams['slug'];
        this.breadcrumbItems = [];
        this.getFleetDetails();
      } else {
        this.router.navigateByUrl('/fleets');
      }
    });
  }

  getFleetDetails(): void {
    this.loading = true;
    this.subscriptions.add(
      this.fleetsService.getFleetDetails(this.slug).subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.breadcrumbItems = []
            this.fleetData = res?.data;
            this.breadcrumbItems.push(
              {
                name: this.fleetData?.menu,
                link: '/fleets/category',
                queryParams: { slug: this.fleetData?.menu }
              },
              {
                name: this.fleetData?.title,
                link: '/fleets/details',
                queryParams: { slug: this.fleetData?.title }
              }
            );
            this.handleMetaTags();
            // this.getSimilarFleets();
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

  // getSimilarFleets(): void {
  //   this.similarFleetsLoading = true;
  //   this.subscriptions.add(
  //     this.fleetsService.getFleets(10).subscribe({
  //       next: (res: any) => {
  //         if(res?.status == 200) {
  //           this.similarFleetsData = res?.data?.data;
  //         }
  //         this.similarFleetsLoading = false;
  //       },
  //       error: (err: any) => {
  //         console.log(err);
  //         this.similarFleetsLoading = false;
  //       }
  //     })
  //   );
  // }

  // onLinkOpened(fleet: any): void {
  //   this.handleMetaTags();
  // }

  handleMetaTags(): void {
    const content: any = {
      title: this.fleetData.title,
      useTranslation: false,
      description: this.fleetData.desc,
      keywords: this.fleetData.desc,
      image: this.fleetData.image,
      // url: `${environment.websiteUrl}news/news-view/${encodeURIComponent(this.fleetData.slug)}`
      url: `${environment.websiteUrl}/fleets/details?slug=${this.fleetData.slug}`
    };
    this.metaService.createMetaData(content);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
