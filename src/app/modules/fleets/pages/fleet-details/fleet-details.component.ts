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
  similarEventsData: any[] = [];
  similarEventsLoading = false;
  slug: string = '';
  typeId: any;
  loading = false;
  breadcrumbItems = [
    {
      name: this.translateService.instant('Fleets.Fleets'),
      link: '/fleets'
    }
  ];
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
    this.route.params.subscribe((params: any) => {
      if(params['slug']) {
        this.slug = params['slug'];
        this.breadcrumbItems = []
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
                  // link: '/fleets/category?slug=' + this.fleetData?.menu
                  link: `/fleets/category?slug=${this.fleetData?.menu}`

                },
                {
                name: this.fleetData?.title,
                link: '/fleets/details?slug' + this.fleetData?.title
              })
            this.handleMetaTags();
            // this.getSimilarEvents();
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

  // getSimilarEvents(): void {
  //   this.similarEventsLoading = true;
  //   this.subscriptions.add(
  //     this.fleetsService.getEvents(10).subscribe({
  //       next: (res: any) => {
  //         if(res?.status == 200) {
  //           this.similarEventsData = res?.data?.data;
  //         }
  //         this.similarEventsLoading = false;
  //       },
  //       error: (err: any) => {
  //         console.log(err);
  //         this.similarEventsLoading = false;
  //       }
  //     })
  //   );
  // }

  // onLinkOpened(event: any): void {
  //   this.handleMetaTags();
  // }

  handleMetaTags(): void {
    const content: any = {
      title: this.fleetData.title,
      useTranslation: false,
      description: this.fleetData.short,
      keywords: this.fleetData.short,
      image: this.fleetData.image,
      // url: `${environment.websiteUrl}news/news-view/${encodeURIComponent(this.fleetData.slug)}`
      url: `${environment.websiteUrl}/events/details/${this.fleetData.slug}`
    };
    this.metaService.createMetaData(content);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
