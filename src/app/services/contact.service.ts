import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) {}

  // Method to send contact form data to backend
  submitContactForm(data: any): Observable<any> {
    const apiUrl = 'https://your-backend-api.com/contact';  // Replace with your actual backend API endpoint
    return this.http.post(apiUrl, data);
  }
}
