import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { EventList } from '../models/Events';
import { Bookings } from '../models/Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  private apiUrl = 'https://localhost:7171/api/Events';

  constructor(private http: HttpClient) {}

  getBookings(): Observable<Bookings[]> {
    const token = localStorage.getItem('adminToken'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('User is not authorized. No token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<Bookings[]>(`${this.apiUrl}/getBookings`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching goals:', error);
        throw error;
      })
    );
  }

  approveBooking(bookingId: number): Observable<Bookings> {
    const token = localStorage.getItem('adminToken'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('User is not authorized. No token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post<Bookings>(`${this.apiUrl}/approveBooking/${bookingId}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error booking event:', error);
        throw error;
      })
    );
  }
  addEvent(eventData: EventList): Observable<EventList> {
    const token = localStorage.getItem('adminToken'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('User is not authorized. No token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post<EventList>(`${this.apiUrl}/createEvent`, { headers }).pipe(
      catchError((error) => {
        console.error('Error booking event:', error);
        throw error;
      })
    );
  }

  deleteEvent(eventId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/events/${eventId}`);
  }
}
