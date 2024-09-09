import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoreBusinessService } from '../../services/core-business.service';

@Component({
    selector: 'app-core-business',
    templateUrl: './core-business.component.html',
    styleUrls: ['./core-business.component.scss']
})
export class CoreBusinessComponent implements OnInit, OnDestroy {

    coreList: any[] = [];
    loading = false;
    searchMode = false;
    searchQuery = '';  
    subscription = new Subscription();

    constructor(
        private coreBusinessService: CoreBusinessService
    ) { }

    ngOnInit(): void {
        this.getCoreList();
    }

    getCoreList(): void {
        this.loading = true;
        this.subscription.add(
            this.coreBusinessService.getCoreBusinessMenus().subscribe({
                next: (res: any) => {
                    if (res?.status == 200) {
                        this.coreList = res?.data?.data;
                        this.loading = false;
                    }
                },
                error: (err: any) => {
                    this.loading = false;
                }
            })
        );
    }

    searchForBusiness(query: string): void {
        if (query?.length) {
          this.searchMode = true;
          this.searchQuery = query;
        } else {
          this.searchMode = false;
          this.searchQuery = '';
        }
        this.coreList = [];
        this.getCoreList();
      }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
