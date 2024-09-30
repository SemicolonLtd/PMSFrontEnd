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

  getAllNews(pageSize: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/news/${pageSize}`);
  }

  getNews(categoryId: number, pageSize: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/news/by-category/${categoryId}/${pageSize}`);
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
