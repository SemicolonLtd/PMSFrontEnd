import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TendersService {

  constructor(private http: HttpClient) { }

  getTendersCategories(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/tender/categories`);
  }

  getAllTenders(pageSize: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/tender/${pageSize}`);
  }

  getTendersByCategory(categoryId: number, pageSize: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/tender/by-category/${categoryId}/${pageSize}`);
  }

  getTopTender(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/tender/get/inPage`);
  }

  searchForTender(query: string, pageSize: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/tender/search/${query}/${pageSize}`);
  }

  getTenderDetails(slug: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/tender/by-slug/${slug}`);
  }

}
