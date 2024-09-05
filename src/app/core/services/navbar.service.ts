import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(
    private http: HttpClient
  ) { }

  getNavLinkDetails(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/page/all/Menus`)
  }

}
