import { Component, OnDestroy, OnInit } from '@angular/core';
import { StaticService } from '../../services/static.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {

  pageContent: any;
  loading = false;
  pageSlug = '';
  breadcrumbItems: any[] = [];
  subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private staticService: StaticService
  ) { }

  ngOnInit(): void {
    this.getPageSlug();
  }

  getPageSlug(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['slug']) {
        this.pageSlug = params['slug'];
        this.getPageContent();
      }
    })
  }

  getPageContent(): void {
    this.loading = true;
    this.subscription.add(
      this.staticService.getPageDetails(this.pageSlug).subscribe({
        next: (res: any) => {
          if (res?.status == 200) {
            this.pageContent = res?.data?.data[0];
            this.breadcrumbItems = [
              {
                name: this.pageContent.title,
                link: '/static/content/' + this.pageContent.slug
              }
            ]
          }
          this.loading = false;
        },
        error: (err: any) => {
          this.loading = false;
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
