import { ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pms';
  pageYoffset!: number;

  constructor(
    private scroll: ViewportScroller
  ) {}

  @HostListener('window:scroll', [''])
  onScroll(): void {
    this.pageYoffset = window.pageYOffset;
  }


  scrollToTop(): void {
    this.scroll.scrollToPosition([0, 0])
  }

}
