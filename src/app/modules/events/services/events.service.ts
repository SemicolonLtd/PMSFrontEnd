import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient) { }

  getEvents(pageSize: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/event/${pageSize}`);
  }

  getTopEvent(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/event/get/inPage`);
  }

  searchForEvent(query: string, pageSize: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/event/search/${query}/${pageSize}`);
  }

  getEventDetails(slug: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/event/slug/${slug}`);
  }

}
