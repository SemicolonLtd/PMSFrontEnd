import { DOCUMENT, isPlatformBrowser, ViewportScroller } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie';
import { filter } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pms';
  pageYoffset!: number;
  currentRoute!: string;
  lang: any = environment.lang;
  isLoading = true;
  isPopStateNavigation = false;
  // fromLink = false;
  // isLangLoaded = false;
  // linkName:any;
  constructor(
    private scroll: ViewportScroller,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const currentLang = this.router.routerState.snapshot.root.queryParams['lang'] || environment.lang;
    this.router.navigate([], { queryParams: { lang: currentLang }, queryParamsHandling: 'merge' });

  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Check if the navigation is triggered by browser back/forward button
        // if (event.navigationTrigger === 'popstate') {
        //   this.isPopStateNavigation = true;
        // } else {
        //   this.isPopStateNavigation = false;
        // }}
        if (event instanceof NavigationEnd) {
          if (isPlatformBrowser(this.platformId)) {
            this.checkLanguageFromUrl();
          }
        }
      }
    });
    // this.translateService.use(environment.lang);
    this.checkLanguageFromUrl();
    this.checkCurrentRoute();
    this.checkLoading();
  }

  @HostListener('window:scroll', [''])
  onScroll(): void {
    this.pageYoffset = window.pageYOffset;
  }


  scrollToTop(): void {
    this.scroll.scrollToPosition([0, 0])
  }

  checkCurrentRoute(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url
      });
  }

  checkLoading(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (event instanceof NavigationEnd) {
        this.isLoading = false;
      }
    });
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

  changeDir(): void {
    if (this.lang === 'ar') {
      this.document.dir = 'rtl';
      this.document.documentElement.lang;
    } else {
      this.document.dir = 'ltr';
      this.document.documentElement.lang = 'en';
    }
    // this.lang = this.cookieService.get('lang');
    // this.isLangLoaded = true;
    // const queryParams = {
    //   lang: this.lang
    // }
    // this.router.navigate(
    //   [],
    //   {
    //     relativeTo: this.route,
    //     queryParams: queryParams,
    //     queryParamsHandling: 'merge', // remove to replace all query params by provided
    // });
  }

  checkLanguageFromUrl(): void {
    this.route.queryParams.subscribe(params => {
      console.log('params:', params);
      console.log('route', this.route);
      
      if (params['lang']) {
        this.cookieService.put('lang', params['lang']);
        this.lang = params['lang'];
        this.checkCookiesForLang();
      // } else if (!this.isPopStateNavigation) {  // Prevent navigate on back button
        // const queryParams = {
        //   lang: this.lang
        // };
        // this.router.navigate(
        //   [],
        //   {
        //     relativeTo: this.route,
        //     queryParams: { lang: this.lang},
        //     queryParamsHandling: 'merge',
        //   }
        // );
        // this.checkCookiesForLang();
      }
    });
  }

}
