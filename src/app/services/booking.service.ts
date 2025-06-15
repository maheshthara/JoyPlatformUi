import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { EventList } from '../models/Events';
import { Bookings } from '../models/Booking';
import { AddEvent } from '../models/addEvent';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  private apiUrl = 'https://localhost:7171/api/Events';
  private imageApi='https://localhost:7171'

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
  getEvents(): Observable<EventList[]> {
    const token = localStorage.getItem('adminToken'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('User is not authorized. No token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<EventList[]>(`${this.apiUrl}/getEvents`).pipe(map(events => events.map(event => ({
        ...event,
        imageUrl: event.imageUrl
      })))
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
  addEvent(eventData: FormData): Observable<AddEvent> {
    const token = localStorage.getItem('adminToken'); // Retrieve token from localStorage
    if (!token) {
        throw new Error('User is not authorized. No token found.');
    }

    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
    });

    return this.http.post<any>(`${this.apiUrl}/createEvent`, eventData, { headers }).pipe(
        catchError((error) => {
            console.error('Error booking event:', error);
            throw error;
        })
    );
}

  deleteEvent(eventId: number): Observable<EventList> {
    const token = localStorage.getItem('adminToken'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('User is not authorized. No token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.delete<EventList>(`${this.apiUrl}/deleteEvent/${eventId}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error booking event:', error);
        throw error;
      })
    );
  }
  deleteBooking(bookingId: number): Observable<Bookings> {
    const token = localStorage.getItem('adminToken'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('User is not authorized. No token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.delete<Bookings>(`${this.apiUrl}/deleteBooking/${bookingId}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error booking event:', error);
        throw error;
      })
    );
  }
  updateEvent(eventId: number,eventData:FormData): Observable<EventList> {
    const token = localStorage.getItem('adminToken'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('User is not authorized. No token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.put<EventList>(`${this.apiUrl}/updateEvent/${eventId}`,eventData, { headers }).pipe(
      catchError((error) => {
        console.error('Error booking event:', error);
        throw error;
      })
    );
  }
}
