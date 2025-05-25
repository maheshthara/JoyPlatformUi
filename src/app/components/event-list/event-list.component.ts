import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventList } from '../../models/Events';
import { Bookings } from '../../models/Booking';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: EventList[] = [];
  filteredEvents: EventList[] = [];
  nextEvents: EventList[] = []; // User's registered events
  categories: string[] = [];
  locations: string[] = [];
  bookings: Bookings[] = [];
  selectedCategory: string = '';
  selectedLocation: string = '';

  constructor(
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(
      (data) => {
        this.events = data.map(event => {
          // Prepend the base URL to the image URL
          event.imageUrl = `https://localhost:7171${event.imageUrl}`;
          return event;
        });
        this.filteredEvents = [...this.events];
        this.categories = [...new Set(data.map((event) => event.category))];
        this.locations = [...new Set(data.map((event) => event.location))];
        this.loadNextEvents(); // Load user's registered events
      },
      (error) => {
        console.error('Error fetching events', error);
      }
    );
  }

  loadNextEvents() {
    // Mock data for "Your Next Events" section
    this.nextEvents = this.events.filter((e) => e.description); // Add a field `isRegistered` for registered events
  }

  filterEvents() {
    this.filteredEvents = this.events.filter(event => {
      const categoryMatch = this.selectedCategory ? event.category === this.selectedCategory : true;
      const locationMatch = this.selectedLocation ? event.location === this.selectedLocation : true;
      return categoryMatch && locationMatch;
    });
  }

  filterByCategory(event: Event) {
    this.selectedCategory = (event.target as HTMLSelectElement).value;
    this.filterEvents(); // Apply both filters together
  }

  filterByLocation(event: Event) {
    this.selectedLocation = (event.target as HTMLSelectElement).value;
    this.filterEvents(); // Apply both filters together
  }

  filterByDate(event: Event) {
    const selectedDate = new Date((event.target as HTMLInputElement).value);
    this.filteredEvents = this.events.filter(
      (e) =>
        new Date(e.startDate).toDateString() === selectedDate.toDateString()
    );
  }

  filterByThisWeek() {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Start of this week (Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End of this week (Saturday)
  
    this.filteredEvents = this.events.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    });
  }
  
  filterByWeekend() {
    this.filteredEvents = this.events.filter(event => {
      const eventDate = new Date(event.startDate);
      const day = eventDate.getDay(); // Get day of the week (0 = Sunday, 6 = Saturday)
      return day === 0 || day === 6; // Sunday or Saturday
    });
  }
  
  filterByNextWeek() {
    const today = new Date();
    const startOfNextWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7)); // Start of next week (next Sunday)
    const endOfNextWeek = new Date(startOfNextWeek);
    endOfNextWeek.setDate(startOfNextWeek.getDate() + 6); // End of next week (next Saturday)
  
    this.filteredEvents = this.events.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate >= startOfNextWeek && eventDate <= endOfNextWeek;
    });
  }
  
  bookEvent(eventId: number) {
    this.router.navigate(['/book-event', eventId]);
  }

  viewEvent(eventId: number) {
    this.router.navigate(['/view-event', eventId]);
  }

  isCalendarOpen: boolean = true; // Calendar is open by default

  toggleCalendar() {
    this.isCalendarOpen = !this.isCalendarOpen;
  }
}
