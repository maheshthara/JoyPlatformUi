import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserRegistration } from '../models/UserRegistration';
import { UserLogin } from '../models/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiUrl = 'https://localhost:7171/api/User';
  // BehaviorSubject will store the login state
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable for other components to subscribe

  constructor(private http: HttpClient) { }

  signUp(userData: UserRegistration): Observable<UserRegistration> {
    const encodedEmail = encodeURIComponent(userData.email); // URL encode the email
    return this.http.post<UserRegistration>(`${this.apiUrl}/register?userEmail=${encodedEmail}`, userData);
  }
  login(userData: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(`${this.apiUrl}/login`, userData).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('jwtToken', response.token); // Save token to local storage
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }
  // Check login status based on JWT token in localStorage
  checkLoginStatus(): boolean {
    const token = localStorage.getItem('jwtToken');
    return !!token;  // Return true if token exists, false otherwise
  }

  logout() {
    localStorage.removeItem('jwtToken'); // Clear token on logout
    this.isLoggedInSubject.next(false)
  }


  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
}