import { Component } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { EventService } from '../../services/event.service';
import { Bookings } from '../../models/Booking';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent {
  bookings: Bookings[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit(){
    this.eventService.getUserBookings().subscribe((response) => {
      this.bookings = Array.isArray(response) ? response : [response];
    });
  }
  
}
