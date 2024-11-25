import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventList } from '../../models/Events';

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
        this.events = data;
        this.filteredEvents = data;
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

  filterByCategory(event: Event) {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    this.filteredEvents = selectedCategory
      ? this.events.filter((e) => e.category === selectedCategory)
      : this.events;
  }

  filterByLocation(event: Event) {
    const selectedLocation = (event.target as HTMLSelectElement).value;
    this.filteredEvents = selectedLocation
      ? this.events.filter((e) => e.location === selectedLocation)
      : this.events;
  }

  filterByDate(event: Event) {
    const selectedDate = new Date((event.target as HTMLInputElement).value);
    this.filteredEvents = this.events.filter(
      (e) =>
        new Date(e.startDate).toDateString() === selectedDate.toDateString()
    );
  }

  filterByThisWeek() {
    // Implement logic to filter events for this week
  }

  filterByWeekend() {
    // Implement logic to filter events for the weekend
  }

  filterByNextWeek() {
    // Implement logic to filter events for next week
  }

  bookEvent(eventId: number) {
    this.router.navigate(['/book-event', eventId]);
  }

  viewEvent(eventId: number) {
    this.router.navigate(['/view-event', eventId]);
  }
}
