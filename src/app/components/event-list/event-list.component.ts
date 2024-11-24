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
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  events:EventList[]=[];
  filteredEvents: EventList[] = []; // Events filtered by category
  categories: string[] = []; // Unique categories
  locations:string[]=[];

  constructor(private eventService:EventService,private router:Router){}

  ngOnInit() {
  this.loadEvents();
  }

bookEvent(eventId:number){
  this.router.navigate(['/book-event',eventId])
}

loadEvents(){
  this.eventService.getEvents().subscribe((data)=>{
    this.events = data;
    this.filteredEvents = data; // Initialize filtered events with all events
     // Extract unique categories
     this.categories = [...new Set(data.map((event) => event.category))];
     this.locations = [...new Set(data.map((event) => event.location))];

  },
  (error)=>{
    console.error('Error fecthing events',error)
  });
  
}

filterByCategory(event: Event) {
  const selectedCategory = (event.target as HTMLSelectElement).value;

  if (selectedCategory) {
    this.filteredEvents = this.events.filter(
      (e) => e.category === selectedCategory
    );
  } else {
    this.filteredEvents = this.events; // Show all events if no category is selected
  }
}
filterByLocation(event: Event) {
  const selectedLocation = (event.target as HTMLSelectElement).value;

  if (selectedLocation) {
    this.filteredEvents = this.events.filter(
      (e) => e.location === selectedLocation
    );
  } else {
    this.filteredEvents = this.events; // Show all events if no category is selected
  }
}
}
