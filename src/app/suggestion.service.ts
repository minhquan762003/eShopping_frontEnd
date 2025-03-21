import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  private apiUrl = 'http://localhost:8080/api'; // URL API Flask

  constructor(private http: HttpClient) {}

  getSuggestions(prefix: string): Observable<any> {
    const params = new HttpParams().set('prefix', prefix);
    return this.http.get<any>(`${this.apiUrl}/products/autocomplete`, { params });
  }
}
