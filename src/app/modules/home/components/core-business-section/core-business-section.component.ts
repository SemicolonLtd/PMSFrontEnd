import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-core-business-section',
  templateUrl: './core-business-section.component.html',
  styleUrls: ['./core-business-section.component.scss']
})
export class CoreBusinessSectionComponent implements OnInit, OnDestroy {

  coreBusinessData: any;
  loading = false;
  subscription = new Subscription();
  
  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getCoreBusinessData();
  }

  getCoreBusinessData(): void {
    this.loading = true;
    this.subscription.add(
      this.homeService.getCoreBusiness().subscribe({
        next: (res: any) => {
          if (res?.status === 200) {
            this.coreBusinessData = res?.data?.data;
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
