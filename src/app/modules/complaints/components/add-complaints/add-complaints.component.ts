import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { ComplaintsService } from '../../services/complaints.service';
import { environment } from './../../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

type Status = "LOADING" | "SUCCESS" | "FAIL" | "DEFAULT";


@Component({
  selector: 'app-add-complaints',
  templateUrl: './add-complaints.component.html',
  styleUrls: ['./add-complaints.component.scss'],
})
export class AddComplaintsComponent implements OnInit, OnDestroy {
  // Dependancy Injection >>
  private complaintsService: ComplaintsService = inject(ComplaintsService);
  private fb: FormBuilder = inject(FormBuilder);
  private translateService: TranslateService = inject(TranslateService);
  private toastrService: ToastrService = inject(ToastrService);

  // Variable >>
  private subscription: Subscription = new Subscription();
  complaintForm!: FormGroup;
  employeeErrorMessage: string = '';
  userCodeErrorMessage: string = '';
  userCodeStatus: Status = "DEFAULT";
  verifyCodeStatus: Status = "DEFAULT";
  sendSuccessfully: boolean = false;
  loadingSubmit: boolean = false;
  complaintTypeLoading: boolean = false;
  complaintId: string = '';
  uploadedFiles: File[] = [];
  readOnlyComplainType: boolean = false;
  showCode: boolean = true;
  complaintsTypes: any;
  complaintNumber: string = '';
  disableUserType = false;
  disableCode = false;
  disableVerifyOTP = false;
  readonlyMainInfo = false;

  usersHaveCode: string[] = [
    'client',
    'service_provider',
    'resource_supplier',
  ];

  // Life Cycle Component
  ngOnInit(): void {
    this.initComplaintForm();
    this.verifyCodeTyping();
    this.getComplaintTypesByUser('client');
    this.onChangeUserCode();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



  initComplaintForm(): void {
    this.complaintForm = this.fb.group({
      type: ['client', Validators.required],
      complaint_type_id: ['', [Validators.required]],
      full_name: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.pattern(/^(?:\+|00)?[0-9]{8,15}$/)]
      ],
      email: ['', [Validators.required, Validators.email]],
      code: ['', Validators.required],
      message: ['', Validators.required],
      verifyCode: ['', [Validators.required, Validators.pattern(/[0-9]{6}/)]]
    });
  }
  readonlyEmail(): boolean {
    if (this.usersHaveCode?.includes(this.complaintForm.get('type')?.value)) {
      return !!this.complaintForm.get('code')?.invalid || !!this.complaintForm.get('complaint_type_id')?.invalid || !!this.complaintForm.get('full_name')?.invalid || !!this.complaintForm.get('phone_number')?.invalid
    } else {
      return !!this.complaintForm.get('complaint_type_id')?.invalid || !!this.complaintForm.get('full_name')?.invalid || !!this.complaintForm.get('phone_number')?.invalid
    }
  }

  addComplaint(): void {
    this.loadingSubmit = true;
    const formData = new FormData();

    // convert object to form Data
    this.FillFormData(formData);
    // // submit

    this.subscription.add(
      this.complaintsService.submitComplaint(formData).subscribe({
        next: (res) => {
          this.loadingSubmit = false;
          if (res?.success) {
            this.sendSuccessfully = true;
            this.complaintNumber = res?.data.complaint_number;
          }
        },
        error: (err) => {
          this.loadingSubmit = false
          this.toastrService.error(err?.error?.message);
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
    this.complaintForm.patchValue({ type: event?.target?.value })
    // make error employee '' 
    this.employeeErrorMessage = '';
    this.complaintForm.patchValue({ email: '' })
  }

  getComplaintTypesByUser(userType: string): void {
    this.complaintTypeLoading = true;
    this.subscription.add(
      this.complaintsService.getComplaintsTypeByUserType(userType).subscribe({
        next: (res) => {
          this.complaintTypeLoading = false;
          this.complaintsTypes = res?.data;
        },
        error: (err) => {
          this.complaintTypeLoading = false;
          this.toastrService.error(err?.error?.message);
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
    if (this.complaintForm.get('type')?.value == "employee" && !/@pms\.com$/.test(this.complaintForm.get('email')?.value)) {
      this.employeeErrorMessage = this.translateService.instant("Complaints.EmployeeEmail")
    } else {
      this.employeeErrorMessage = '';
    }
    // call init complaint 
    this.initComplaint({
      type: this.complaintForm.get('type')?.value,
      complaint_type_id: this.complaintForm.get('complaint_type_id')?.value,
      full_name: this.complaintForm.get('full_name')?.value,
      phone_number: this.complaintForm.get('phone_number')?.value,
      email: this.complaintForm
        .get('email')?.value,
      code: this.complaintForm.get('code')?.value
    });
  }

  verifyCodeTyping(): void {
    this.complaintForm
      .get('verifyCode')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((value: string) => {
        // verify otp
        if (value != '') {
          if (this.complaintForm.get('verifyCode')?.valid) {
            this.verifyOTP({ "complaint_id": this.complaintId, "otp": value });
          }
        } else {
          this.verifyCodeStatus = "DEFAULT";
        }
      });
  }



  captchaToken: string | null = null;
  siteKey: string = environment.siteKey;
  onCaptchaResolved(captchaResponse: any): void {
    this.captchaToken = captchaResponse;
    const formData = new FormData();
    formData.append('captcha_token', this.captchaToken ?? '');
    

  }

  get isSubmitDisabled(): boolean {
    return (
      !this.complaintForm.get('type')?.valid ||
      !this.complaintForm.get('complaint_type_id')?.valid ||
      !this.complaintForm.get('full_name')?.valid ||
      !this.complaintForm.get('phone_number')?.valid ||
      !this.complaintForm.get('email')?.valid ||
      !this.complaintForm.get('message')?.valid ||
      !this.complaintForm.get('verifyCode')?.valid ||
      this.loadingSubmit ||
      !this.captchaToken
    );
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



  onChangeUserCode(): void {
    this.userCodeErrorMessage = "";
    this.complaintForm
      .get('code')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((value: string) => {
        // verify code
        if (value != '') {
          if(this.complaintForm.get('code')?.valid){
            this.verifyCode({ "type": this.complaintForm.get('type')?.value, "code": value });
          }
        } else {
          this.userCodeStatus = "DEFAULT";
        }
      });
  }

  verifyCode(data: any): void {
    this.userCodeStatus = "LOADING";
    this.userCodeErrorMessage = '';
    this.subscription.add(
      this.complaintsService.verifyCode(data).subscribe({
        next: (res) => {
          if (res?.success) {
            this.userCodeStatus = "SUCCESS";
            this.readOnlyComplainType = true;
            // ########################################### close user type and code
            this.disableUserType = true;
            this.disableCode = true;
          }
        },
        error: () => {
          this.userCodeStatus = "FAIL";
          this.userCodeErrorMessage = this.translateService.instant("Complaints.userCodeError")
        },
      })
    );
  }

  verifyOTP(data: any): void {
    this.verifyCodeStatus = "LOADING";
    this.subscription.add(this.complaintsService.verifyOTP(data).subscribe({
      next: (res) => {
        if (res?.success) {
          this.verifyCodeStatus = "SUCCESS";
          // ############################## close verify OTP input
          this.disableVerifyOTP = true;
        }
      },
      error: () => {
        this.verifyCodeStatus = "FAIL";
      }
    }))
  }

  initComplaint(data: any): void {
    this.subscription.add(
      this.complaintsService.initiateComplaint(data).subscribe({
        next: (res) => {
          if (res?.success) {
            this.complaintId = res?.data?.complaint_id;
            this.toastrService.success(this.translateService.instant("Complaints.CodeSendSuccessfully"))
            // ########################################## close complaint_type_id  full_name phone_number email
            this.readonlyMainInfo = true;
          }
        },
        error: (err) => {
          this.toastrService.error(err?.error?.message)
        }
      })
    );
  }

  closePopUp(): void {
    this.sendSuccessfully = false;
    this.complaintForm.reset();
    this.uploadedFiles = [];
    this.complaintId = '';
    this.employeeErrorMessage = '';
    this.userCodeErrorMessage = '';
    this.userCodeStatus = "DEFAULT";
    this.verifyCodeStatus = "DEFAULT";
    this.showCode = true;

  }
  
}
