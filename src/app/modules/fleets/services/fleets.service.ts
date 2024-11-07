import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FleetsService {

  constructor(private http: HttpClient) { }

  getCategoryBySlug(slug: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/fleet/category-by-slug/${slug}`);
  }

  getFleetsCategories(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/fleet/categories`);
  }

  searchForEvent(query: string, pageSize: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/event/search/${query}/${pageSize}`);
  }

  getFleetDetails(slug: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/fleet/by-slug/${slug}`);
  }

}
