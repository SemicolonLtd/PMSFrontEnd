import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {

  constructor(private http: HttpClient) { }

  gatAllFaqs(pageSize: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/faq/${pageSize}`);
  }
  
}
