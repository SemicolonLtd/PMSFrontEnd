import { Component, OnDestroy, OnInit } from '@angular/core';
import { StaticService } from '../../services/static.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from 'src/app/core/services/navbar.service';
import { TranslateService } from '@ngx-translate/core';
import { MetaData } from 'src/app/core/models/metaData.model';
import { environment } from 'src/environments/environment';
import { MetaService } from 'src/app/core/services/meta.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  pageContent: any;
  loading = false;
  pageSlug = '';
  breadcrumbItems: any[] = [];
  subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private staticService: StaticService,
    private translateService: TranslateService,
    private metaService: MetaService
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
            this.handleMetaTags()
            if(this.pageContent) {
              this.breadcrumbItems = [
                {
                  name: this.translateService.instant(`Static.${this.pageContent.menu_name}`),
                  link: '/'
                },
                {
                  name: this.pageContent.title,
                  link: 'content/' + this.pageContent.slug
                }
              ]
            }
          }
          this.loading = false;
        },
        error: (err: any) => {
          this.loading = false;
        }
      })
    )
  }

  handleMetaTags(): void {
    const content: MetaData = {
      title: this.pageContent.title,
      useTranslation: false,
      description: this.pageContent.body,
      keywords: this.pageContent.slug,
      image:  this.pageContent.image,
      // url: `${environment.websiteUrl}static/${encodeURIComponent(this.staticPageData.slug)}`
      url: `${environment.websiteUrl}/content/${this.pageContent.slug}`
    };
    this.metaService.createMetaData(content);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
