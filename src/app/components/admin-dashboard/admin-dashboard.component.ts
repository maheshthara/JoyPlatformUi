import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { Bookings } from '../../models/Booking';
import { EventList } from '../../models/Events';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{

  events: EventList[] = [];
  bookings: Bookings[] = [];

  constructor(private eventService: EventService,private bookingService:BookingService,private toastr:ToastrService) {}

  ngOnInit() {
    // Fetch events and bookings when dashboard is initialized
    this.getBookings();
  }

  getEvents() {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }

  approveBooking(bookingId: number): void {
    this.bookingService.approveBooking(bookingId).subscribe(() => {
      this.getBookings(); // Refresh bookings after approval
      this.toastr.success('Approved Succesful');
      this.getBookings();
    });
  }
  getBookings() {
    this.bookingService.getBookings().subscribe((data) => {
      this.bookings = data;
    },
    (error)=>{
      console.error('Error fecthing events',error)
    });
  }

  addEvent(eventData: any): void {
    this.bookingService.addEvent(eventData).subscribe((response) => {
      console.log('Event Succesfully Added:',response);
      this.getEvents(); // Refresh events after adding a new one
    },
  error=>{
    console.error('Error while adding event',error)
  });
  }

  deleteEvent(eventId: number) {
    this.bookingService.deleteEvent(eventId).subscribe(() => {
      this.getEvents(); // Refresh events after deleting an event
    });
  }
}
