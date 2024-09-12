import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventsService } from '../../services/events.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit, OnDestroy {

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
  subscriptions = new Subscription();

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
