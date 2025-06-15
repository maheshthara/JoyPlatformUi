import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { UserRegistration } from '../models/UserRegistration';
import { UserLogin } from '../models/UserLogin';
import { User } from '../models/HealthGoal';
import {jwtDecode, JwtPayload} from 'jwt-decode';  // Import jwt-decode
import { JwtPayLoad } from '../models/JwtPayLoad';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey: string = 'authToken';  // Key to store token in localStorage
  private apiUrl = 'https://localhost:7171/api/User';
  private adminApiUrl = 'https://localhost:7171/api/Admin/adminLogin';
  // BehaviorSubject will store the login state
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable for other components to subscribe
  isAdmin$ = this.isAdminSubject.asObservable();


  constructor(private http: HttpClient) { 
    const token = localStorage.getItem('adminToken');
  if (token) {
    this.isLoggedInSubject.next(true); // Set login state
  }
  }
  
  signUp(userData: UserRegistration): Observable<UserRegistration> {
    const encodedEmail = encodeURIComponent(userData.email); // URL encode the email
    return this.http.post<UserRegistration>(`${this.apiUrl}/register?userEmail=${encodedEmail}`, userData);
  }
  userLogin(userData: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(`${this.apiUrl}/login`, userData).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('jwtToken', response.token); // Save token to local storage
          console.log('Token stored:', localStorage.getItem('jwtToken'));
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }
  Adminlogin(userData: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(this.adminApiUrl, userData).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('adminToken', response.token); // Save token to local storage
          console.log('Token stored:', localStorage.getItem('adminToken'));
          this.isAdminSubject.next(true);
          this.isAdminLoggedIn();
        }
      })
    );
  }
  // Fetch user Details by extracting user ID from JWT token
  getUserDetails(): Observable<User[]> {
    const token = localStorage.getItem('jwtToken'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('User is not authorized. No token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<User[]>(`${this.apiUrl}/getUserDetails`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching goals:', error);
        throw error;
      })
    );
  }
  // Check login status based on JWT token in localStorage
  checkLoginStatus(): boolean {
    const token = localStorage.getItem('jwtToken');
    return !!token;  // Return true if token exists, false otherwise
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
  getUserRole(): string | null {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      return 'Admin';
    }
    const userToken = localStorage.getItem('jwtToken');
    return userToken ? 'User' : null;
  }
  isAdminLoggedIn(): boolean {
    return localStorage.getItem('adminToken') !== null;
  }
  isUserLoggedIn(): boolean {
    return localStorage.getItem('jwtToken') !== null;
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('adminToken');
    this.isLoggedInSubject.next(false);
    this.isAdminSubject.next(false);
  }
}