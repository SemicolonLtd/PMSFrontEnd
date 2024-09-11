import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
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

  constructor(
    private eventsService: EventsService,
    private translateService:TranslateService

  ) { }

  ngOnInit(): void {
    this.getTopEventData();
    this.getEventsData();
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
