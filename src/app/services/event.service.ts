import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { EventList } from '../models/Events';
import { Bookings } from '../models/Booking';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'https://localhost:7171/api/EventBooking';
  constructor(private http:HttpClient) { }

  getEvents():Observable<EventList[]>{
    const token = localStorage.getItem('jwtToken'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('User is not authorized. No token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<EventList[]>(`${this.apiUrl}/getAllEvents`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching goals:', error);
        throw error;
      })
    );
  }
  bookEvent(eventId: number):Observable<EventList> {
    const token = localStorage.getItem('jwtToken'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('User is not authorized. No token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post<EventList>(`${this.apiUrl}/bookEvent/${eventId}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error booking event:', error);
        throw error;
      })
    );
  }
  getEventById(eventId:string):Observable<EventList>{
    const token = localStorage.getItem('jwtToken'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('User is not authorized. No token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<EventList>(`${this.apiUrl}/${eventId}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching Event:', error);
        throw error;
      })
    );
  }
  getUserBookings():Observable<Bookings>{
    const token = localStorage.getItem('jwtToken'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('User is not authorized. No token found.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<Bookings>(`${this.apiUrl}/myBookings`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching Event:', error);
        throw error;
      })
    );
  }
  }
