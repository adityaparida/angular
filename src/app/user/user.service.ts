import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8081/crud/api/v1/user';

  getUsers() {
    return this.http.get(`${this.baseUrl}/all`);
  }

  getUser(id: any) {  
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createUser(user: any) {
    return this.http.post(`${this.baseUrl}/create`, user);
  }

  updateUser(id: any, value: any) {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteUser(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
