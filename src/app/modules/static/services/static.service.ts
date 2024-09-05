import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticService {

  constructor(private http: HttpClient) { }

  getPageDetails(slug: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/page/${slug}`)
  }
  
}
