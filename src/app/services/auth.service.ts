import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegistration } from '../models/UserRegistration';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://localhost:7171/api/User';

  signUp(userData:UserRegistration): Observable<UserRegistration> {
    const encodedEmail = encodeURIComponent(userData.email); // URL encode the email
    return this.http.post<UserRegistration>(`${this.apiUrl}/register?userEmail=${encodedEmail}`, userData);
  }
}
