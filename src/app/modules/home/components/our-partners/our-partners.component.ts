import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HomeService } from './../../services/home.service';

@Component({
  selector: 'app-our-partners',
  templateUrl: './our-partners.component.html',
  styleUrls: ['./our-partners.component.scss']
})
export class OurPartnersComponent implements OnDestroy {
  products!: any[]
  responsiveOptions: any[] =  [
    {
        breakpoint: '1400px',
        numVisible: 6,
        numScroll: 1
    },
    {
        breakpoint: '1220px',
        numVisible: 5,
        numScroll: 1
    },
    {
        breakpoint: '1100px',
        numVisible: 4,
        numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '480px',
      numVisible: 2,
      numScroll: 1
    }
  ];
  subscriptions = new Subscription()
  loading: boolean = false
  constructor(
    private homeService: HomeService
  ){}
  ngOnInit(): void {
    this.getAllPartners()

  }


  getAllPartners(): void {
    this.subscriptions.add(
      this.homeService.getAllPartners().subscribe({
          next: (res: any) => {
            if (res?.status == 200) {
              this.products = res.data.data
            }
            this.loading = false
          },
          error: (err: any) => {
            this.loading = false
          }
        }
      )
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
