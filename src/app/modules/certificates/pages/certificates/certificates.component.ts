import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CertificatesService } from '../../services/certificates.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { MetaService } from 'src/app/core/services/meta.service';


@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit, OnDestroy {

  certificatesList: any[] = [];
  loading = false;
  pageSize = 10;
  paginationData: any;
  breadcrumbItems = [
    {
      name: this.translateService.instant('Navbar.Certificates'),
      link: '/certificates'
    }
  ];
  subscriptions = new Subscription();

  constructor(
    private certificatesService: CertificatesService,
    private translateService: TranslateService,
    private metaService: MetaService
  ) { }

  ngOnInit(): void {

    this.getAllCertificates();
  }

  getAllCertificates(): void {
    this.loading = true;
    this.subscriptions.add(
      this.certificatesService.gatAllCertificates(this.pageSize).subscribe({
        next: (res: any) => {
          if (res?.status == 200) {
            this.certificatesList = [... this.certificatesList, ...res?.data?.data];
            this.handleMetaTags()
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
    this.getAllCertificates();
  }

  handleMetaTags(): void {
    const content: any = {
      title: 'Navbar.Certificates',
      useTranslation: true,
      description: 'Certificates Discription',
      keywords: 'PMS',
      image: `${environment.websiteUrl}/assets/images/global/logo.svg`,
      // url: `${environment.websiteUrl}news/news-view/${encodeURIComponent(this.projectData.slug)}`
      url: `${environment.websiteUrl}/certificates`
    };
    this.metaService.createMetaData(content);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
  
}
