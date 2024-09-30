import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { MetaService } from 'src/app/core/services/meta.service';
import { environment } from 'src/environments/environment';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  searchTitle = this.translateService.instant('Search.OurEvents')
  barTitle = this.translateService.instant('Events.EventAndActivities')
  pageTopEvent: any;
  topEventLoading = false;
  eventsList: any[] = [];
  eventsLoading = false;
  pageSize = 10;
  searchMode = false;
  searchQuery = '';
  paginationData: any;
  subscriptions = new Subscription();
  schemaObj: any;
  schemaList: any[] = [];

  constructor(
    private eventsService: EventsService,
    private translateService:TranslateService,
    private metaService: MetaService

  ) { }

  ngOnInit(): void {
    this.getTopEventData();
    this.getEventsData();
    this.handleMetaTags();
  }

  getTopEventData(): void {
    this.topEventLoading = true;
    this.subscriptions.add(
      this.eventsService.getTopEvent().subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.pageTopEvent = res?.data;
          }
          this.topEventLoading = false;
        },
        error: (err: any) => {
          this.topEventLoading = false
        }
      })
    )
  }

  getEventsData(): void {
    this.eventsLoading = true;
    const API = this.searchMode ? 
    this.eventsService.searchForEvent(this.searchQuery, this.pageSize) :
    this.eventsService.getEvents(this.pageSize)

    this.subscriptions.add(
      API.subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.eventsList = [... this.eventsList, ...res?.data?.data];
            this.paginationData = res?.data?.meta?.pagination;
            this.handleSchema()
          }
          this.eventsLoading = false
        },
        error: (err: any) => {
          this.eventsLoading = false
        }
      })
    )
  }

  searchForEvents(query: string): void {
    if (query?.length) {
      this.searchMode = true;
      this.searchQuery = query;
    } else {
      this.searchMode = false;
      this.searchQuery = '';
    }
    this.eventsList = [];
    this.getEventsData();
  }

  loadMore(): void {
    this.pageSize += 10;
    this.getEventsData();
  }

  handleMetaTags(): void {
    const content: any = {
      title: 'Navbar.Events',
      useTranslation: true,
      description: 'Events Discription',
      keywords: 'Events',
      image: `${environment.websiteUrl}/assets/images/global/logo.svg`,
      // url: `${environment.websiteUrl}news/news-view/${encodeURIComponent(this.projectData.slug)}`
      url: `${environment.websiteUrl}/events`
    };
    this.metaService.createMetaData(content);
  }

  initSchemaObj(): void {
    this.schemaObj = {
      "@context": "https://schema.org",
      "@type": "Event",
    };
  }

  handleSchema(): void {
    this.initSchemaObj();
    this.eventsList.forEach((item: any) => {
      this.schemaObj['startDate'] = item.date;
      this.schemaObj['name'] = item.title;
      this.schemaObj['description'] = item.desc;
      this.schemaObj['image'] = item.image;
      this.schemaObj['url'] = `${environment.websiteUrl}/events/details/${item.slug}`;
      this.schemaList.push(this.schemaObj);
      this.initSchemaObj();
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
