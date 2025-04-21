import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { ComplaintsService } from '../../services/complaints.service';
import { environment } from './../../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

type Status = 'LOADING' | 'SUCCESS' | 'FAIL' | 'DEFAULT';

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
  currentLang = this.translateService.currentLang || 'en';
  complaintForm!: FormGroup;
  userCodeErrorMessage: string = '';
  userCodeStatus: Status = 'DEFAULT';
  verifyCodeStatus: Status = 'DEFAULT';
  verifyEmailStatus:Status = "DEFAULT";
  sendSuccessfully: boolean = false;
  loadingSubmit: boolean = false;
  complaintTypeLoading: boolean = false;
  complaintId: string = '';
  uploadedFiles: File[] = [];
  showCode: boolean = true;
  complaintsTypes: any;
  complaintNumber: string = '';
  STEP: 0 | 1 = 0;

  usersHaveCode: string[] = ['client', 'service_provider', 'resource_supplier'];

  // Life Cycle Component
  ngOnInit(): void {
    this.initComplaintForm();
    this.verifyCodeTyping();
    this.getComplaintTypesByUser('client');
    this.onChangeUserCode();
    this.translateService.onLangChange.subscribe((lang) => {
      this.currentLang = lang.lang;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initComplaintForm(): void {
    this.complaintForm = this.fb.group(
      {
        type: ['client', Validators.required],
        complaint_type_id: ['', [Validators.required]],
        full_name: ['', Validators.required],
        phone_number: [
          '',
          [Validators.required, Validators.pattern(/^(?:\+|00)?[0-9]{8,15}$/)],
        ],
        email: ['', [Validators.required, Validators.email]],
        code: ['', Validators.required],
        message: ['', Validators.required],
        verifyCode: ['', [Validators.required, Validators.pattern(/[0-9]{6}/)]],
      },
      {
        validators: this.emailDomainValidator(),
      }
    );
  }
  emailDomainValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const type = form.get('type')?.value;
      const emailControl = form.get('email');
      const email = emailControl?.value;
  
      if (!email || emailControl?.errors?.['email']) {
        // لو الإيميل فاضي أو فيه خطأ في الصيغة، مانعملش أي حاجة
        return null;
      }
  
      const errors: any = {};
  
      // شرط @pms لو type = employee
      if (type === 'employee' && !email.includes('@pms')) {
        errors['missingPms'] = true;
      }
  
      // تحقق من الامتداد
      const validExtensions = ['.com', '.net', '.org', '.edu', '.gov'];
      const lowerEmail = email.toLowerCase();
      const endsWithValidExtension = validExtensions.some(ext =>
        lowerEmail.endsWith(ext)
      );
  
      if (!endsWithValidExtension) {
        errors['invalidExtension'] = true;
      }
  
      if (Object.keys(errors).length > 0) {
        emailControl?.setErrors({ ...emailControl.errors, ...errors });
        return errors;
      }
  
      // إزالة الأخطاء السابقة إن وجدت
      if (emailControl?.errors) {
        delete emailControl.errors['missingPms'];
        delete emailControl.errors['invalidExtension'];
        if (Object.keys(emailControl.errors).length === 0) {
          emailControl.setErrors(null);
        }
      }
  
      return null;
    };
  }
  
  
  
  readonlyEmail(): boolean {
    if (this.usersHaveCode?.includes(this.complaintForm.get('type')?.value)) {
      return (
        !!this.complaintForm.get('code')?.invalid ||
        !!this.complaintForm.get('complaint_type_id')?.invalid ||
        !!this.complaintForm.get('full_name')?.invalid ||
        !!this.complaintForm.get('phone_number')?.invalid
      );
    } else {
      return (
        !!this.complaintForm.get('complaint_type_id')?.invalid ||
        !!this.complaintForm.get('full_name')?.invalid ||
        !!this.complaintForm.get('phone_number')?.invalid
      );
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
          this.loadingSubmit = false;
          this.toastrService.error(err?.error?.message);
        },
      })
    );
  }

  onUserTypeChange(event: any): void {
    this.complaintForm.reset();
    this.showCode = this.usersHaveCode.includes(event?.target?.value);
    this.getComplaintTypesByUser(event?.target?.value);
    this.complaintForm.patchValue({ type: event?.target?.value });
    this.verifyCodeStatus = 'DEFAULT';
    this.userCodeStatus = 'DEFAULT';
    this.userCodeErrorMessage = '';
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
      console.log(this.uploadedFiles);
    }
  }
  removeFile(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

  emailTyping(): void {
    if(!this.isVerify){
      // call init complaint
      this.initComplaint({
        type: this.complaintForm.get('type')?.value,
        complaint_type_id: this.complaintForm.get('complaint_type_id')?.value,
        full_name: this.complaintForm.get('full_name')?.value,
        phone_number: this.complaintForm.get('phone_number')?.value,
        email: this.complaintForm.get('email')?.value,
        code: this.complaintForm.get('code')?.value,
      });
    }
    this.isVerify = true;
  }

  emailValid = false;
  isVerify:boolean = false;

  onEmailBlur() {
    const emailControl = this.complaintForm.get('email');
    this.emailValid = emailControl?.valid ?? false;
  }

  onCodeFocus() {
    if(!this.isVerify){
      if (this.emailValid) {
        this.emailTyping();
      }
    }
    this.isVerify = true;
  }

  verifyCodeTyping(): void {
    this.complaintForm
      .get('verifyCode')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((value: string) => {
        // verify otp
        if (value != '') {
          if (this.complaintForm.get('verifyCode')?.valid) {
            this.verifyOTP({ complaint_id: this.complaintId, otp: value });
          }
        } else {
          this.verifyCodeStatus = 'DEFAULT';
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
      this.loadingSubmit
    );
  }

  FillFormData(formData: FormData): void {
    formData.append('message', this.complaintForm.get('message')?.value);
    formData.append('full_name', this.complaintForm.get('full_name')?.value);
    formData.append(
      'phone_number',
      this.complaintForm.get('phone_number')?.value
    );
    formData.append('complaint_id', this.complaintId);

    this.uploadedFiles.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
  }

  onChangeUserCode(): void {
    this.userCodeErrorMessage = '';
    this.complaintForm
      .get('code')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((value: string) => {
        // verify code
        if (value != '') {
          if (this.complaintForm.get('code')?.valid) {
            this.verifyCode({
              type: this.complaintForm.get('type')?.value,
              code: value,
            });
          }
        } else {
          this.userCodeStatus = 'DEFAULT';
        }
      });
  }

  verifyCode(data: any): void {
    this.userCodeStatus = 'LOADING';
    this.userCodeErrorMessage = '';
    this.subscription.add(
      this.complaintsService.verifyCode(data).subscribe({
        next: (res) => {
          if (res?.success) {
            this.userCodeStatus = 'SUCCESS';
          }
        },
        error: () => {
          this.userCodeStatus = 'FAIL';
          this.userCodeErrorMessage = this.translateService.instant(
            'Complaints.userCodeError'
          );
        },
      })
    );
  }

  verifyOTP(data: any): void {
    this.verifyCodeStatus = 'LOADING';
    this.subscription.add(
      this.complaintsService.verifyOTP(data).subscribe({
        next: (res) => {
          if (res?.success) {
            this.verifyCodeStatus = 'SUCCESS';
          }
        },
        error: () => {
          this.verifyCodeStatus = 'FAIL';
        },
      })
    );
  }

  initComplaint(data: any): void {
    this.verifyEmailStatus = "LOADING";
    this.subscription.add(
      this.complaintsService.initiateComplaint(data).subscribe({
        next: (res) => {
          if (res?.success) {
            this.verifyEmailStatus = "SUCCESS";
            this.complaintId = res?.data?.complaint_id;
            this.toastrService.success(
              this.translateService.instant('Complaints.CodeSendSuccessfully')
            );
          }
        },
        error: (err) => {
          this.verifyEmailStatus = "FAIL";
          this.isVerify = false;
          this.toastrService.error(err?.error?.message);
        },
      })
    );
  }

  closePopUp(): void {
    this.sendSuccessfully = false;
    this.complaintForm.reset();
    this.complaintForm.patchValue({type:'client'})
    this.getComplaintTypesByUser('client');
    this.uploadedFiles = [];
    this.complaintId = '';
    this.userCodeErrorMessage = '';
    this.userCodeStatus = 'DEFAULT';
    this.verifyCodeStatus = 'DEFAULT';
    this.verifyEmailStatus = "DEFAULT";
    this.showCode = true;
    this.STEP = 0;
    this.isVerify = false;
  }
  

}
