import { Component, inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComplaintsService } from '../../services/complaints.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnDestroy {

  case:"GET"| "ADD" = "ADD";
  complaintNumber!:number;
  private subscription:Subscription = new Subscription();
  private complaintsService:ComplaintsService = inject(ComplaintsService);
  private toastr:ToastrService = inject(ToastrService);
  private translateService:TranslateService = inject(TranslateService);
  loadingSearch:boolean = false;
  complaintData:any;

  searchForComplaint(complainNumber: number): void {
    this.loadingSearch = true;
    this.subscription.add(
      this.complaintsService.getComplaintByComplaintNumber(complainNumber).subscribe({
        next: (res) => {
          this.loadingSearch = false;
          if (res?.success) {
            this.case = 'GET';
            this.complaintData = res.data;
            setTimeout(() => {
              this.scrollToSection();
            }, 100);
          }
        },
        error: () => {
          this.case = 'ADD';
          this.loadingSearch = false;
          this.toastr.error(this.translateService.instant('Complaints.ErrorComplaintType'));
        }
      })
    );
  }

  scrollToSection(): void {
    const element = document.getElementById('target-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
