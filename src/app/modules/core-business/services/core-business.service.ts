import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreBusinessService {

  constructor(private http: HttpClient) { }

  getCoreBusinessMenus(pageSize: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/core/get/${pageSize}`);
  }

  searchForBusiness(query: string, pageSize: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/core/search/${query}/${pageSize}`);
  }

  getBusinessDetails(slug: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/core/business/slug/${slug}`);
  }

  getSimilarBusiness(slug: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/core/business/similar/${slug}/10`);
  }
  
}
