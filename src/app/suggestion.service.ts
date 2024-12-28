import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  private apiUrl = 'http://localhost:5000/suggest'; // URL API Flask

  constructor(private http: HttpClient) {}

  getSuggestions(input: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { input });
  }
}
