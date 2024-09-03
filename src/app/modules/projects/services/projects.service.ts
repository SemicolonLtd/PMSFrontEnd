import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  searchForProject(query: string, pageSize: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/project/search/${query}/${pageSize}`);
  }

}
