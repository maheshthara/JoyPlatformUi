import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { EventList } from '../models/Events';
import { Bookings } from '../models/Booking';
import { AddEvent } from '../models/addEvent';

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
  getEvents(): Observable<EventList[]> {
    const token = localStorage.getItem('adminToken'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('User is not authorized. No token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<EventList[]>(`${this.apiUrl}/getEvents`, { headers }).pipe(
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
  addEvent(eventData: AddEvent): Observable<AddEvent> {
    const token = localStorage.getItem('adminToken'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('User is not authorized. No token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post<AddEvent>(`${this.apiUrl}/createEvent`,eventData, { headers }).pipe(
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
  updateEvent(eventId: number,updatedEvent:EventList): Observable<EventList> {
    const token = localStorage.getItem('adminToken'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('User is not authorized. No token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.delete<EventList>(`${this.apiUrl}/updateEvent/${eventId}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error booking event:', error);
        throw error;
      })
    );
  }
}
