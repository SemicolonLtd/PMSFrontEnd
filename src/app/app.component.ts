import { ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pms';
  pageYoffset!: number;
  currentRoute!: string;

  constructor(
    private scroll: ViewportScroller,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.checkCurrentRoute()
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
      console.log(event);
      
      this.currentRoute = event.url
    });
  }

}
