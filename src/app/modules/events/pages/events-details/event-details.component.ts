import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventsService } from '../../services/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { MetaService } from 'src/app/core/services/meta.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit, OnDestroy {
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

  eventData: any = {};
  similarEventsData: any[] = [];
  similarEventsLoading = false;
  slug: string = '';
  typeId: any;
  loading = false;
  breadcrumbItems = [
    {
      name: this.translateService.instant('Navbar.Events'),
      link: '/events'
    }
  ];
  subscriptions = new Subscription();

  constructor(
    private eventsService: EventsService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private metaService: MetaService
  ) { }

  ngOnInit(): void {
    this.getEventSlugFromParams();
  }

  getEventSlugFromParams(): void {
    this.route.params.subscribe((params: any) => {
      if(params['slug']) {
        this.slug = params['slug'];
        this.getEventDetails();
      } else {
        this.router.navigateByUrl('/events');
      }
    });
  }

  getEventDetails(): void {
    this.loading = true;
    this.subscriptions.add(
      this.eventsService.getEventDetails(this.slug).subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.eventData = res?.data;
            this.eventData.media = [
              ...this.eventData.media,
              {
                image: this.eventData.image
              }
            ];
            this.breadcrumbItems.push({
              name: this.eventData?.title,
              link: '/events/details/' + this.eventData?.slug
            })
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
    this.similarEventsLoading = true;
    this.subscriptions.add(
      this.eventsService.getEvents(10).subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.similarEventsData = res?.data?.data;
          }
          this.similarEventsLoading = false;
        },
        error: (err: any) => {
          console.log(err);
          this.similarEventsLoading = false;
        }
      })
    );
  }

  onLinkOpened(event: any): void {
    this.handleMetaTags();
  }

  handleMetaTags(): void {
    const content: any = {
      title: this.eventData.title,
      useTranslation: false,
      description: this.eventData.short,
      keywords: this.eventData.short,
      image: this.eventData.image,
      // url: `${environment.websiteUrl}news/news-view/${encodeURIComponent(this.eventData.slug)}`
      url: `${environment.websiteUrl}/events/details/${this.eventData.slug}`
    };
    this.metaService.createMetaData(content);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
