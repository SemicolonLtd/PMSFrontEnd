import { Component,Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HostListener } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { isPlatformBrowser } from '@angular/common';
import { CoreBusinessService } from 'src/app/modules/core-business/services/core-business.service';
import { Location } from '@angular/common';
import { SettingsService } from 'src/app/core/services/settings.service';
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
  coreBusinessList: any[] = [];
  displayedLinks: any[] = [];
  subscriptions = new Subscription();
  linkName = '';
  socialMediaData: any;

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private cookieService:CookieService,
    private translateService:TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private coreBusinessService: CoreBusinessService,
    private navbarService: NavbarService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private settingsService: SettingsService,


  ) {}

  ngOnInit(): void {
    this.linkName = this.router.url;
    console.log(this.route.url);

    console.log(this.linkName);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects) {
        if (event.urlAfterRedirects.includes('?lang=ar') || event.urlAfterRedirects.includes('?lang=en')) {
    console.log(this.linkName);
          
          this.lang = event.urlAfterRedirects.slice(-2);
          this.linkName = event.urlAfterRedirects.slice(0, event.urlAfterRedirects.length - 8);
        }
        this.linkName = event.urlAfterRedirects;
      }
    });
    // if(isPlatformBrowser(this.platformId)) {
    //   this.checkCookiesForLang()
    // }
    // this.router.events.subscribe(
    //   event=> {
    //     if(event instanceof NavigationEnd) {
    //       if (isPlatformBrowser(this.platformId)) {
    //         this.checkCookiesForLang()
    //       }
    //     }
        
    //   }
    // )
    this.checkCurrentRoute();
    this.getCoreBusinessMenus();
    this.getAllLinks();
    this.checkCurrentRoute();
    this.getSocialMediaData();
  }

  getCoreBusinessMenus(): void {
    this.subscriptions.add(
      this.coreBusinessService.getCoreBusinessMenus(1000).subscribe({
        next: (res: any) => {
          this.coreBusinessList = [
            {
              name: 'core-business',
              menu: res.data?.data?.map((item: any) => {
                return {
                  name: item.title,
                  link: 'core-business/' + item.slug
                }
              })
            }
          ];
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    )
  }

  getSocialMediaData(): void {
    this.subscriptions.add(
      this.settingsService.getAllSettings('social').subscribe({
        next: (res: any) => {
          if (res?.status === 200) {
            this.socialMediaData = res?.data;
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    );
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    this.isSticky = scrollPosition > 50
  }

  // checkCookiesForLang(): void {
  //   if (this.cookieService.get('lang')) {
  //     // this.translateService.use(this.cookieService.get('lang')!);
  //     this.lang = this.cookieService.get('lang')!;
  //     // environment.lang = this.lang;
  //     // this.document.documentElement.lang = this.lang;
  //   } else {
  //     // this.translateService.use(this.lang);
  //     this.cookieService.put('lang', this.lang);
  //     // environment.lang = this.lang;
  //     // this.document.documentElement.lang = this.lang;
  //   }
  //   this.changeDir();
  // }

  changeLang(lang:any): void {
    this.lang = lang.value.code;
    environment.lang = this.lang;
    this.translateService.use(lang.value.code);
    this.cookieService.put('lang', lang.value.code);
    console.log(this.linkName);
    
    const link = this.linkName.slice(0, this.linkName.length - 8)
    this.router.navigate([link], { queryParams: { lang: this.lang } })
    this.route.queryParams.subscribe(
      params=> {
        if (Object.keys(params).length > 1) {
          this.location.replaceState(`${link}&lang=${this.lang}`);
        } else {
          this.location.replaceState(`${link}?lang=${this.lang}`);
        }
      }
    )
    this.changeDir();
    location.reload();
  }

  changeDir(): void {
    if (this.lang === 'ar') {
      this.document.dir = 'rtl';
      this.document.documentElement.lang = 'ar';
    } else {
      this.document.dir = 'ltr';
      this.document.documentElement.lang = 'en';
    }
  }

  onSelectLink(type: string, title: string, directRoute: boolean): void {
    this.sidebarMobileVisible = false;
    if (directRoute) {
      if(['about-us','our-strategy','key-assets','hse-policy-records','sustainability'].includes(type)) {
        this.router.navigateByUrl('/content?slug=' + type);
      } else {
        this.router.navigate(['/' + type]);
      }
      this.sidebarVisible = false;
      this.navDetailsOpened = false;
    } else {
      this.detailsType = type;
      this.detailsTitle = this.translateService.instant(`Navbar.${title}`);
      this.displayedLinks = [...this.linksList, ...this.coreBusinessList].filter((listItem: any) => listItem.name === type)[0]?.menu;
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
        // this.currentRoute = event.url;

      const urlTree = this.router.parseUrl(event.url);
      this.currentRoute = urlTree.root.children['primary']?.segments.map(it => it.path).join('/') || '/';
      });
  }

  getAllLinks(): void {
    this.loading = true;
    this.subscriptions.add(
      this.navbarService.getNavLinkDetails().subscribe(
        (res:any) => {
          if (res?.status === 200) {
            this.linksList = res?.data;
            this.linksList = [
              ...this.linksList,
              {
                name: 'projects',
                menu: [
                  {
                    name: this.translateService.instant('Projects.RecentProjects') ,
                    link: '/projects?type=recent-projects',
                  },
                  {
                    name: this.translateService.instant('Projects.CompletedProjects'),
                    link: '/projects?type=completed-projects',
                  },
                  {
                    name: this.translateService.instant('Projects.MegaProjects'),
                    link: '/projects?type=mega-projects',
                  }
                ]
              },
              {
                name: 'media-center',
                menu: [
                  {
                    name: this.translateService.instant('Navbar.News'),
                    link: 'news'
                  },
                  {
                    name: this.translateService.instant('Navbar.Events'),
                    link: 'events'
                  },
                  // {
                  //   name: this.translateService.instant('Navbar.ContactUs'),
                  //   link: 'contact-us'
                  // }
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
