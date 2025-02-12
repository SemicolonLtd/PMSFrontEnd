import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewsService } from '../../services/news.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { MetaService } from 'src/app/core/services/meta.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit, OnDestroy {
  websiteUrl = environment.websiteUrl;
  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 2
    }
  ];
  newsData: any = {};
  similarNewsData: any[] = [];
  similarNewsLoading = false;
  slug: string = '';
  typeId: any;
  loading = false;
  breadcrumbItems = [
    {
      name: this.translateService.instant('Navbar.News'),
      link: '/events'
    }
  ];
  subscriptions = new Subscription();

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private translateService: TranslateService,
    private metaService: MetaService
  ) { }

  ngOnInit(): void {
    this.getNewsSlugFromParams();
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getNewsSlugFromParams(): void {
    this.route.params.subscribe((params: any) => {
      if(params['slug']) {
        this.slug = params['slug'];
        this.breadcrumbItems = []
        this.getNewsDetails();
      } else {
        this.router.navigateByUrl('/news');
      }
    });
  }

  getNewsDetails(): void {
    this.loading = true;
    this.subscriptions.add(
      this.newsService.getNewsDetails(this.slug).subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.newsData = res?.data;
            this.newsData.media = [
              ...this.newsData.media
              // {
              //   image: this.newsData.image
              // }
            ];
            this.breadcrumbItems.push(
              {
                name: this.newsData?.menu,
                link: '/news/'
              },
              {
              name: this.newsData?.title,
              link: '/news/details/' + this.newsData?.slug
            });
            this.handleMetaTags();
            this.getSimilarNews();
          }
          this.loading = false;
        },
        error: (err: any) => {
          console.log(err);
          this.loading = false;
        }
      })
    );
  }

  getSimilarNews(): void {
    this.similarNewsLoading = true;
    this.subscriptions.add(
      this.newsService.getSimilarNews(this.newsData?.category_id).subscribe({
        next: (res: any) => {
          if(res?.status == 200) {
            this.similarNewsData = res?.data?.data;
          }
          this.similarNewsLoading = false;
        },
        error: (err: any) => {
          console.log(err);
          this.similarNewsLoading = false;
        }
      })
    );
  }

  // onLinkOpened(event: any): void {
  //   this.handleMetaTags();
  // }

  handleMetaTags(): void {
    const content: any = {
      title: this.newsData.title,
      useTranslation: false,
      description: this.newsData.short,
      keywords: this.newsData.short,
      image: this.newsData.image,
      // url: `${environment.websiteUrl}news/news-view/${encodeURIComponent(this.newsData.slug)}`
      url: `${environment.websiteUrl}/news/details/${this.newsData.slug}`
    };
    this.metaService.createMetaData(content);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
