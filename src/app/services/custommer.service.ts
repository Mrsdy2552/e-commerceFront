import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustommerService {
  apiUrl = 'http://localhost:8080/api/Customers';
  private http = inject(HttpClient);

  constructor() {}

  postcreateUser(user: any) {
    return this.http.post<any>(this.apiUrl, user);
  }
}
