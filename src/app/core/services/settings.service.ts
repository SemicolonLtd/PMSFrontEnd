import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllSettings(key: string): Observable<any>{
    return this.http.get(`${environment.apiUrl}/statistics/${key}`)
  }

}
