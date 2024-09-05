import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getHeaderSliderData(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/slider`);
  }

  getSliderStatistics(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/statistics`);
  }

  getRecentProjects(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/project/in-home/5`);
  }

  getNewsCategories(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/news/get/category`);
  }

  getNewsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/news/in-home/by-category/4/${categoryId}`);
  }

  getCoreBusiness(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/core/get/2`);
  }

}
