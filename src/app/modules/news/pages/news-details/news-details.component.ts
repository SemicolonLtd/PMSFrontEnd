import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit, OnDestroy {
  
  responsiveOptions: any[] = [
    // {
    //   breakpoint: '2000px',
    //   numVisible: 4
    // },
    {
        breakpoint: '1024px',
        numVisible: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];
  newsData: any = {};
  similarNewsData: any[] = [];
  similarNewsLoading = false;
  slug: string = '';
  typeId: any;
  loading = false;
  subscriptions = new Subscription();

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getNewsSlugFromParams();
  }

  getNewsSlugFromParams(): void {
    this.route.params.subscribe((params: any) => {
      if(params['slug']) {
        this.slug = params['slug'];
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

}
