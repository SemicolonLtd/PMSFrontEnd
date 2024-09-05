import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreBusinessService {

  constructor(private http: HttpClient) { }

  getCoreBusinessMenus(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/core/get/1000`);
  }

  getBusinessDetails(slug: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/core/business/slug/${slug}`);
  }
  
}
