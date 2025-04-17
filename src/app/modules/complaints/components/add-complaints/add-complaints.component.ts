import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { ComplaintsService } from '../../services/complaints.service';
import { environment } from './../../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-complaints',
  templateUrl: './add-complaints.component.html',
  styleUrls: ['./add-complaints.component.scss'],
})
export class AddComplaintsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private complaintsService: ComplaintsService = inject(ComplaintsService);
  private fb: FormBuilder = inject(FormBuilder);
  private translateService:TranslateService = inject(TranslateService);
  private toastrService:ToastrService = inject(ToastrService);
  employeeErrorMessage:string = '';
  userCodeErrorMessage:string = '';
  userCodeLoading:boolean = false;
  userCodeSuccess:boolean = false;
  userCodeFaild:boolean = false;
  verifyCodeLoading:boolean = false;
  verifyCodeSuccess:boolean = false;
  verifyCodeFaild:boolean = false;
  sendSuccessfully:boolean = false;
  loadingSubmit:boolean=false;
  complaintId:string = '';
  uploadedFiles: File[] = [];

  usersHaveCode: string[] = [
    'client',
    'service_provider',
    'resource_supplier',
  ];
  showCode: boolean = true;
  complaintForm!: FormGroup;

  complaintsTypes: any;

  ngOnInit(): void {
    this.initComplaintForm();
    this.verifyCodeTyping();
    this.getComplaintTypesByUser('client');
    this.onChangeUserCode();

  }

  initComplaintForm(): void {
    this.complaintForm = this.fb.group({
      type: ['client', Validators.required],
      complaint_type_id: ['', [Validators.required]],
      full_name: [null, Validators.required],
      phone_number: [null, Validators.required],
      email: [null],
      code: [null, Validators.required],
      message: [null, Validators.required],
      verifyCode:['']
    });
  }

  addComplaint(): void {
    this.loadingSubmit = true;
    const formData = new FormData();

    // convert object to form Data
    this.FillFormData(formData);
    // // submit

    this.subscription.add(
      this.complaintsService.submitComplaint(formData).subscribe({
        next:(res)=> {
          this.loadingSubmit = false;
          console.log("response => ", res);
          if(res?.success){
            this.sendSuccessfully = true;
          }
        },
        error:(err)=>{
          this.loadingSubmit=false
          console.log("error => ", err)
        }
      })
    );

  }

  onUserTypeChange(event: any): void {
    // appear user code or not
    this.showCode = this.usersHaveCode.includes(event?.target?.value);
    // fetch complaints type by user type
    this.complaintsTypes = [];
    this.getComplaintTypesByUser(event?.target?.value);
    // set user type value 
    this.complaintForm.patchValue({type:event?.target?.value})
    // make error employee '' 
    this.employeeErrorMessage = '';
    this.complaintForm.patchValue({email:''})
  }

  getComplaintTypesByUser(userType: string): void {
    this.subscription.add(
      this.complaintsService.getComplaintsTypeByUserType(userType).subscribe({
        next: (res) => {
            this.complaintsTypes = res?.data;
        },
        error: (err) => {
        },
      })
    );
  }
  onFileChange(event: any): void {
    const files = event?.target?.files;
    if (files) {
      this.uploadedFiles = [];
      for (let i = 0; i < files.length; i++) {
        this.uploadedFiles.push(files[i]);
      }
    }
  }

  emailTyping(): void {
      if(this.complaintForm.get('type')?.value == "employee" && !this.complaintForm
      .get('email')?.value?.includes('@pms')){
        this.employeeErrorMessage = this.translateService.instant("Complaints.EmployeeEmail")
      }else{
        this.employeeErrorMessage = '';
      }
      // call init complaint 
      this.initComplaint({
        type: this.complaintForm.get('type')?.value,
        complaint_type_id: this.complaintForm.get('complaint_type_id')?.value,
        full_name:this.complaintForm.get('full_name')?.value,
        phone_number:this.complaintForm.get('phone_number')?.value,
        email: this.complaintForm
        .get('email')?.value,
        code: this.complaintForm.get('code')?.value
      });
  }

  verifyCodeTyping(): void {
    this.complaintForm
      .get('verifyCode')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((value:string) => {
        // verify otp
        if(value != ''){
          this.verifyOTP({"complaint_id" : this.complaintId, "otp" : value});
        }else{
          this.verifyCodeFaild = false;
          this.verifyCodeSuccess = false;
          this.verifyCodeLoading = false;
        }
      });
  }



  captchaToken: string | null = null;
  siteKey: string = environment.siteKey;
  onCaptchaResolved(captchaResponse: any): void {
  }



  FillFormData(formData: FormData): void {
    formData.append('message', this.complaintForm.get('message')?.value);
    formData.append('full_name', this.complaintForm.get('full_name')?.value);
    formData.append('phone_number', this.complaintForm.get('phone_number')?.value);
    formData.append('complaint_id', this.complaintId);
  
    this.uploadedFiles.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onChangeUserCode():void 
  {
    this.userCodeErrorMessage ="";
    this.complaintForm
    .get('code')
    ?.valueChanges.pipe(debounceTime(500))
    .subscribe((value:string) => {
      // verify code
      if(value != '' && value?.length < 10){
        this.verifyCode({"type": this.complaintForm.get('type')?.value, "code":value})
      }
    });
  }

  verifyCode(data: any): void {
    this.userCodeSuccess = false;
    this.userCodeFaild = false;
    this.userCodeErrorMessage = '';
    this.userCodeLoading = true;
    this.subscription.add(
      this.complaintsService.verifyCode(data).subscribe({
        next: (res) => {
          this.userCodeLoading = false;
          if(res?.success){
            // user code success make correct and make user type and code read only
            this.userCodeSuccess = true;
            // make user code and user type and complain
          }
        },
        error: (err) => {
          this.userCodeLoading = false;
          this.userCodeFaild = true;
          this.userCodeErrorMessage = this.translateService.instant("Complaints.userCodeError")
        },
      })
    );
  }

  verifyOTP(data:any):void{
    this.verifyCodeLoading = true;
    this.verifyCodeSuccess = false;
    this.verifyCodeFaild = false;
    this.subscription.add(this.complaintsService.verifyOTP(data).subscribe({
      next:(res)=>{
        this.verifyCodeLoading = false;
        if(res?.success){
          this.verifyCodeSuccess = true;
        }
      }, 
      error:(err)=>{
        this.verifyCodeLoading = false;
        this.verifyCodeFaild = true
      }
    }))
  }

  initComplaint(data:any):void {
    this.subscription.add(
      this.complaintsService.initiateComplaint(data).subscribe({
        next:(res)=>{
          if(res?.success){
            this.complaintId = res?.data?.complaint_id;
            this.toastrService.success(this.translateService.instant("Complaints.CodeSendSuccessfully"))
          }
        },
        error:(err)=>{
          this.toastrService.error(err?.error?.message)
        }
      })
    );
  }

  closePopUp():void 
  {
    this.sendSuccessfully = false;
    this.complaintForm.reset(); 
  
    this.uploadedFiles = [];
    this.complaintId = '';
    this.employeeErrorMessage = '';
    this.userCodeErrorMessage = '';
    
    this.userCodeLoading = false;
    this.userCodeSuccess = false;
    this.userCodeFaild = false;
    
    this.verifyCodeLoading = false;
    this.verifyCodeSuccess = false;
    this.verifyCodeFaild = false;
  
    this.complaintsTypes = [];
    this.showCode = true;
  
  }
}
