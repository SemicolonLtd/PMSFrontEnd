import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNewsCategories(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/news/get/category`);
  }

  getNews(categoryId: number, pageSize: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/news/by-category/${pageSize}/${categoryId}`);
  }

  searchForNews(query: string, pageSize: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/news/search/${query}/${pageSize}`);
  }

  getNewsDetails(slug: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/news/slug/${slug}`);
  }

  getSimilarNews( categoryId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/news/by-category/${categoryId}/10`);
  }

}
