import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {}

  get<T>(endpoint: string) {
    return this.httpClient.get(`${this.baseUrl}/${endpoint}`) as Observable<T>;
  }

  post<T>(endpoint: string, params: string[]): Observable<T> {
    return this.httpClient.post(`${this.baseUrl}/${endpoint}`, params) as Observable<T>;
  }
}
