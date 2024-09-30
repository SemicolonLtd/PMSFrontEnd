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
  lang = environment.lang;
  isLoading = true;

  constructor(
    private scroll: ViewportScroller,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService:CookieService,
    private translateService:TranslateService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(
      event=> {
        if(event instanceof NavigationEnd) {
          if (isPlatformBrowser(this.platformId)) {
            this.checkLanguageFromUrl()
          }
        }
        console.log(event);
        
      }
    )
    // if (isPlatformBrowser(this.platformId)) {
    //   this.checkLanguageFromUrl()
    // }
    this.checkCurrentRoute();
    this.checkLoading()
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
  }

  checkLanguageFromUrl(): void {
    this.route.queryParams.subscribe(
      params => {
        if (params['lang']) {
          this.cookieService.put('lang', params['lang'])
          this.lang = params['lang'];
          this.checkCookiesForLang()
        } else {
          const queryParams = {
            lang: this.lang
          }
          this.router.navigate(
            [],
            {
              relativeTo: this.route,
              queryParams: queryParams,
              queryParamsHandling: 'merge', 
            });
          this.checkCookiesForLang()
        }
      }
    )
  }

}
