import { Component, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChange, SimpleChanges } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
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
  loading: boolean = true;
  linksList: any[] = [];
  searchQuery = '';
  lang = environment.lang
  constructor(
    private renderer: Renderer2,
    private router: Router,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.displayedLinks = changes['displayedLinks']?.currentValue ? changes['displayedLinks']?.currentValue : this.displayedLinks;
    this.detailsType = changes['detailsType']?.currentValue ? changes['detailsType']?.currentValue : this.detailsType;
    // this.preventScrollXPage();
  }

  // preventScrollXPage(): void {
  //   if (this.navDetailsVisible) {
  //     this.renderer.setStyle(document.body, 'overflow-y', 'hidden');
  //     this.renderer.setStyle(document.body, 'height', '100vh');
  //   } else {
  //     this.renderer.removeStyle(document.body, 'overflow-y');
  //     this.renderer.removeStyle(document.body, 'height');
  //   }
  // }

  onHideNavDetails(): void {
    this.navDetailsVisible = false;
    this.navDetailsVisibilityChange.emit(this.navDetailsVisible);
  }

  openLink(link: any): void {
    this.onHideNavDetails();
    if (link?.slug) {
      this.router.navigate(['/content'],  {queryParams: { slug:link.slug ,lang :this.lang}});
    } else if (link?.link) {
      if (link?.type) {
        this.router.navigate([link.link], {queryParams: {type: link.type ,lang :this.lang}});
      } else {
        this.router.navigate([link.link], {queryParams: {lang :this.lang}});
      }
    }
  }

  toSearchResults(): void {
    this.onHideNavDetails();
      this.router.navigate(['/search-results'], {
        queryParams: { query: this.searchQuery }
      });
    }

  }
