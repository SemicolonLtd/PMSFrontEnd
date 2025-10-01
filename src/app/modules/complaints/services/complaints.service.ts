import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {
  private http:HttpClient = inject(HttpClient);

  getComplaintsTypeByUserType(userType:string):Observable<any>{
    // get types of complains
    return this.http.post(`${environment.apiUrl2}/complaint-types`,{type:userType})
  }

  verifyCode(data:any):Observable<any>{
    // send  Email to get OTP
    return this.http.post(`${environment.apiUrl2}/complaints/verify-code`, data)
  }


  initiateComplaint(data:any):Observable<any>{
    // send  Email to get OTP
    return this.http.post(`${environment.apiUrl2}/complaints/initiate`, data)
  }

  submitComplaint(data:FormData):Observable<any>{
    // send data to API and send code to email   
    return this.http.post(`${environment.apiUrl2}/complaints/submit`, 
      data
    )
  }

  getComplaintByComplaintNumber(complaintNumber:number):Observable<any>{
    // search for complain
    return this.http.post(`${environment.apiUrl2}/complaints/search`, {"complaint_number": complaintNumber})
  }


  verifyOTP(data:any):Observable<any>{
    // verify OTP
    return this.http.post(`${environment.apiUrl2}/complaints/verify-otp`, data)
  }

  // sendCaptcha(data:FormData):Observable<any>{
  //   return this.http.post(`https://www.google.com/recaptcha/api/siteverify`, data);
  // }

}
