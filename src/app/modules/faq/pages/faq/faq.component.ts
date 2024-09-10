import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FaqsService } from '../../services/faqs.service';

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
  subscriptions = new Subscription();

  constructor(
    private faqsService: FaqsService
  ) { }

  ngOnInit(): void {
    this.getAllFaqs();
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
  
}
