import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  getProjects(pageSize: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/project/${pageSize}`);

  }

  searchForProject(query: string, pageSize: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/project/search/${query}/${pageSize}`);
  }

  getProjectsByType(type: string, pageSize: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/project/type/${type}/${pageSize}`);
  }

  getTopProject(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/project/get/in-page`);
  }
  
  getProjectDetails(slug: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/project/get/slug/${slug}`);
  }

  getSimilarProjects(slug: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/project/similar/${slug}/3`);
  }

}
