import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  API_URL: string = environment.apiUrl
  constructor(
    private httpClient: HttpClient
  ) { }

  getNavLinkDetails(Link: string): Observable<any>{
    return this.httpClient.get(`${this.API_URL}/page/menu/${Link}`)
  }
}
