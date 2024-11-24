import { Component, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChange, SimpleChanges } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { FleetsService } from 'src/app/modules/fleets/services/fleets.service';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-navbar-details',
  templateUrl: './navbar-details.component.html',
  styleUrls: ['./navbar-details.component.scss']
})

export class NavbarDetailsComponent implements OnChanges {
  @Input() sidebarVisible: boolean = false;
  @Input() displayedLinks: any[] = [];
  @Input() detailsType: string = '';
  @Input() detailsTitle: string = '';
  @Input() navDetailsVisible: boolean = false;
  @Output() navDetailsVisibilityChange = new EventEmitter<boolean>();
  subscriptions = new Subscription()
  loading: boolean = false;
  linksList: any[] = [];
  searchQuery = '';
  lang = environment.lang
  displayFleetCategories:boolean = false
  fleetCategories:any = []
  constructor(
    private renderer: Renderer2,
    private router: Router,
    private fleetsService: FleetsService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.getFleetsCategories()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.displayFleetCategories = false;
    this.displayedLinks = changes['displayedLinks']?.currentValue ? changes['displayedLinks']?.currentValue : this.displayedLinks;
    this.detailsType = changes['detailsType']?.currentValue ? changes['detailsType']?.currentValue : this.detailsType;
  }

  onHideNavDetails(): void {
    this.navDetailsVisible = false;
    this.displayFleetCategories = false
    this.navDetailsVisibilityChange.emit(this.navDetailsVisible);
  }

  openLink(link: any): void {
    if (link?.slug) {
      if (link?.slug === 'الاسطول' || link?.slug === 'fleet') {
        this.displayFleetCategories = true
      } else {
        this.onHideNavDetails();
        this.router.navigateByUrl('/content?slug=' + link.slug);
      }
    } else if (link?.link) {
      this.onHideNavDetails();
      this.router.navigateByUrl(link.link);
    }
  }

  onDiscoverMore(): void {
    if (this.displayedLinks[0]?.slug) {
      if (this.displayedLinks[0]?.slug === 'الاسطول' || this.displayedLinks[0]?.slug === 'fleet') {
        this.displayFleetCategories = true
      } else {
        this.onHideNavDetails();
        this.router.navigateByUrl('/content?slug=' + this.displayedLinks[0].slug);
      }
    } else if (this.displayedLinks[0]?.link) {
      this.onHideNavDetails();
      this.router.navigateByUrl(this.displayedLinks[0].link);
    }
  }

  getFleetsCategories(): void {
    this.loading = true
    this.subscriptions.add(
      this.fleetsService.getFleetsCategories().subscribe({
        next: (res: any) => {
          this.loading = false
          if(res?.status == 200) {
            this.fleetCategories = [...res?.data?.data]
          }
        },
        error: (err: any) => {
          this.loading = false
        }
      })
    )
  }

  toSearchResults(): void {
    this.onHideNavDetails();
      this.router.navigate(['/search-results'], {
        queryParams: { query: this.searchQuery }
      });
    }

  openFleetCategory(category:any): void {
    this.onHideNavDetails();
    // this.router.navigate(['/fleets/category'], {queryParams: {slug : category.slug}});
    this.router.navigateByUrl('/fleets/category?slug=' + category.slug);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  }
