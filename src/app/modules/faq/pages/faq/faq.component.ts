import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FaqsService } from '../../services/faqs.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { MetaService } from 'src/app/core/services/meta.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit, OnDestroy {

  faqsList: any[] = [];
  loading = false;
  pageSize = 10;
  paginationData: any;
  breadcrumbItems = [
    {
      name: this.translateService.instant('Footer.FAQ'),
      link: '/faq'
    }
  ];
  subscriptions = new Subscription();

  constructor(
    private faqsService: FaqsService,
    private translateService: TranslateService,
    private sanitizer: DomSanitizer,
    private metaService: MetaService
  ) { }

  ngOnInit(): void {
    this.getAllFaqs();
    this.handleMetaTags();
  }

  getAllFaqs(): void {
    this.loading = true;
    this.subscriptions.add(
      this.faqsService.gatAllFaqs(this.pageSize).subscribe({
        next: (res: any) => {
          if (res?.status == 200) {
            this.faqsList = [... this.faqsList, ...res?.data?.data];
            this.paginationData = res?.data?.meta?.pagination;
          }
          this.loading = false
        },
        error: (err: any) => {
          this.loading = false
        }
      })
    )
  }

  loadMore(): void {
    this.pageSize += 10;
    this.getAllFaqs();
  }

  handleMetaTags(): void {
    const content: any = {
      title: 'Footer.FAQ',
      useTranslation: true,
      description: 'FAQ Discription',
      keywords: 'PMS',
      image: `${environment.websiteUrl}/assets/images/global/logo.svg`,
      // url: `${environment.websiteUrl}news/news-view/${encodeURIComponent(this.projectData.slug)}`
      url: `${environment.websiteUrl}/faq`
    };
    this.metaService.createMetaData(content);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  
}
