import { Component,Inject, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie';
import { NavbarService } from 'src/app/core/services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  langs = [
    { name: 'En', code: 'en' },
    { name: 'Ar', code: 'ar' },
  ];
  lang = environment.lang;
  isSticky = false
  navDetailsOpened: boolean = false;
  detailsType: string = '';
  sidebarMobileVisible: boolean = false;
  detailsTitle: string = '';
  sidebarVisible: boolean = false;
  currentRoute!: string;
  loading: boolean = true;
  linksList: any[] = [];
  displayedLinks: any[] = [];
  subscriptions = new Subscription();

  constructor(
    private router: Router,
    private cookieService:CookieService,
    private translateService:TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    this.checkCurrentRoute();
    this.checkCookiesForLang()
    this.getAllLinks();
    this.checkCurrentRoute()
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    this.isSticky = scrollPosition > 50
  }

  checkCookiesForLang(): void {
    if (this.cookieService.get('lang')) {
      this.translateService.use(this.cookieService.get('lang')!);
      this.lang = this.cookieService.get('lang')!;
      environment.lang = this.lang;
      this.document.documentElement.lang = this.lang;
    } else {
      this.translateService.use(this.lang);
      this.cookieService.put('lang', this.lang);
      environment.lang = this.lang;
      this.document.documentElement.lang = this.lang;
    }
    this.changeDir();
  }

  changeLang(lang:any): void {
    this.lang = lang.value.code;

    environment.lang = this.lang;
    this.translateService.use(lang.value.code);
    this.cookieService.put('lang', lang.value.code);
    this.changeDir();
    location.reload();
  }

  changeDir(): void {
    if (this.lang === 'ar') {
      this.document.dir = 'rtl';
      this.document.documentElement.lang;
    } else {
      this.document.dir = 'ltr';
      this.document.documentElement.lang = 'en';
    }
  }

  onSelectLink(type: string, title: string, directRoute: boolean): void {
    this.sidebarMobileVisible = false;
    if (directRoute) {
      if(['about-us','our-strategy','key-assets','HSE-quality','sustainability'].includes(type)) {
        this.router.navigateByUrl('/content?slug=' + type);
      } else {
        this.router.navigate(['/' + type]);
      }
      this.sidebarVisible = false;
      this.navDetailsOpened = false;
    } else {
      this.detailsType = type;
      this.detailsTitle = title;
      this.displayedLinks = this.linksList.filter((listItem: any) => listItem.name === type)[0]?.menu;
      this.sidebarVisible = false;
      this.navDetailsOpened = true;
    }
  }

  onNavDetailsVisibilityChange(NavDetailsVisible: boolean): void {
    this.navDetailsOpened = NavDetailsVisible;
  }

  checkCurrentRoute(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        console.log(event);

        this.currentRoute = event.url
      });
  }

  getAllLinks(): void {
    this.loading = true;
    this.subscriptions.add(
      this.navbarService.getNavLinkDetails().subscribe(
        (res:any) => {
          if (res?.status === 200) {
            console.log(res);
            this.linksList = res?.data;
            this.linksList = [
              ...this.linksList,
              {
                name: 'projects',
                menu: [
                  {
                    name: 'Recent Projects',
                    link: '/projects?type=recent-projects',
                  },
                  {
                    name: 'Completed Projects',
                    link: '/projects?type=completed-projects',
                  },
                  {
                    name: 'Mega Projects',
                    link: '/projects?type=mega-projects',
                  }
                ]
              },
              {
                name: 'media-center',
                menu: [
                  {
                    name: 'News',
                    link: 'news'
                  },
                  {
                    name: 'Events',
                    link: 'events'
                  },
                  {
                    name: 'Contact Us',
                    link: 'contact-us'
                  }
                ]
              }
            ]
          }
          this.loading = false
        } 
      )
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
