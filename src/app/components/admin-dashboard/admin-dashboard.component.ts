import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { Bookings } from '../../models/Booking';
import { EventList } from '../../models/Events';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { AddEvent } from '../../models/addEvent';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{

  events: EventList[] = [];
  bookings: Bookings[] = [];
  currentEvent: EventList | null = null; // Store the current event for editing
  isEditMode: boolean = false; // Flag to check if in edit mode
  newEvent:AddEvent={
    eventName:'',
    description:'',
    startDate:new Date().toString(),
    location:''
  }
  createEvent:AddEvent[]=[];

  constructor(private eventService: EventService,private bookingService:BookingService,private toastr:ToastrService) {}

  ngOnInit() {
    // Fetch events and bookings when dashboard is initialized
    this.getBookings();
  }

  getEvents():void{
    this.bookingService.getEvents().subscribe((data) => {
      this.events = data;
    }, (error)=>{
      console.error('Error fecthing events',error)
    });
  }

  approveBooking(bookingId: number): void {
    this.bookingService.approveBooking(bookingId).subscribe((response) => {
      this.getBookings(); // Refresh bookings after approval
      this.toastr.success('Approved Succesful');
    });
  }
  getBookings() {
    this.bookingService.getBookings().subscribe((data) => {
      this.bookings = data;
      this.getEvents();
    },
    (error)=>{
      console.error('Error fecthing events',error)
    });
  }

  addEvent():void {
    this.bookingService.addEvent(this.newEvent).subscribe((response) => {
      this.createEvent.push(response);
      this.toastr.success('Event added successfully');
      console.log('Event Succesfully Added:',response);
      this.closeModal(); // Refresh events after adding a new one
      this.getEvents();
    },
  error=>{
    console.error('Error while adding event',error)
  });
  }
  editEvent(eventData: EventList) {
    this.bookingService.updateEvent(eventData.eventId,eventData).subscribe((response) => {
      this.toastr.success('Event Updated Successfully');
      this.getEvents(); // Refresh events after updating
      this.closeModal();
    }, error => {
      console.error('Error while updating event', error);
    });
  }

  deleteEvent(eventId: number) {
    this.bookingService.deleteEvent(eventId).subscribe(() => {
      this.toastr.success('Event Deleted Succesful')
      this.getEvents(); // Refresh events after deleting an event
    });
  }
  openModal(event: EventList | null = null) {
    if (event) {
      this.isEditMode = true;
      this.currentEvent = { ...event }; // Pre-fill form for editing
    } else {
      this.isEditMode = false;
      this.currentEvent = {eventId:0, eventName: '', description: '', startDate: '',location:'' }; // Set blank values for adding
    }
    // Open modal logic (use a library like Bootstrap or custom modal)
  }

  closeModal() {
    this.isEditMode = false;
    this.currentEvent = null;
    // Close modal logic
  }
}
