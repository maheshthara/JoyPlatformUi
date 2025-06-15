import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { EventList } from '../models/Events';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiKey = 'YOUR_GOOGLE_API_KEY'; // Replace with your API key
  private geocodingUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}
 // Function to get latitude and longitude from a location string
 getCoordinates(event: EventList): Observable<EventList> {
  const url = `${this.geocodingUrl}?q=${encodeURIComponent(event.location)}&format=json`;
  return this.http.get<EventList>(url);
}
}