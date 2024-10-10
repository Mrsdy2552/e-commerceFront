import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustommerService {
  apiUrl = urlBack +  'Customers';
  private http = inject(HttpClient);

  constructor() {}

  postcreateUser(user: any) {
    return this.http.post<any>(this.apiUrl, user);
  }
}
