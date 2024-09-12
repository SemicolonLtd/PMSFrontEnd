import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  search(searchQuery: string, pageSize: number): Observable<any>{
    return this.http.get(`${environment.apiUrl}/search/${searchQuery}/${pageSize}`);
  }

}
