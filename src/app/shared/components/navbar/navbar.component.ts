import { Component, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  langs: any[] | undefined;
  lang = environment.lang;
  isSticky = false
  navDetailsOpened: boolean = false;
  detailsType: string = '';
  sidebarMobileVisible: boolean = false;
  currentRoute!: string;

  constructor(
    private router: Router,
    private cookieService:CookieService,
    private translateService:TranslateService,
    @Inject(DOCUMENT) private document: Document,
  ) {}
  ngOnInit(): void {
    this.langs = [
      { name: 'En', code: 'en' },
      { name: 'Ar', code: 'ar' },
  ];

  this.checkCurrentRoute();
  this.checkCookiesForLang()
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

  onSelectLink(type: any, directRoute: boolean): void {
    this.sidebarMobileVisible = false;

    if (directRoute) {
      this.router.navigate(['/' + type]);
      this.navDetailsOpened = false;
    } else {
      this.detailsType = type
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
}
