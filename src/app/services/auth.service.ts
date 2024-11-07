import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserRegistration } from '../models/UserRegistration';
import { UserLogin } from '../models/UserLogin';

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
  login(userData: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(`${this.apiUrl}/login`, userData).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('jwtToken', response.token); // Save token to local storage
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('jwtToken'); // Clear token on logout
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
}