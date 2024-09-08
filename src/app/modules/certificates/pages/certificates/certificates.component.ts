import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CertificatesService } from '../../services/certificates.service';

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
  subscriptions = new Subscription();

  constructor(
    private certificatesService: CertificatesService
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
  
}
