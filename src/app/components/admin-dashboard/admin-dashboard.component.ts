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
  currentEvent: EventList | null = null;
  isEditMode: boolean = false;
  newEvent:AddEvent = { eventName: '', description: '', startDate: new Date().toString(), location: '',category:'' };
  selectedFile: File | null = null; // Add a property to store the selected file
  searchTerm: string = '';
  totalPages: number = 1;
  currentPage: number = 1;
  eventsPerPage: number = 5;
  filteredEvents: EventList[] = [];
  pagedEvents: EventList[] = [];
  createEvent:AddEvent[]=[];

  constructor(private eventService: EventService,private bookingService:BookingService,private toastr:ToastrService) {}

  ngOnInit() {
    // Fetch events and bookings when dashboard is initialized
    this.getBookings();
    this.getEvents();
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  getEvents():void{
    this.bookingService.getEvents().subscribe((data) => {
      this.events = data;
      this.filteredEvents = this.events;
      this.totalPages = Math.ceil(this.filteredEvents.length / this.eventsPerPage);
      this.updatePagedEvents();
    },
    (error) => {
      console.error('Error fetching events', error);
    }
  );
  }
// Filter events based on search term
filterEvents(): void {
  this.filteredEvents = this.events.filter(event =>
    event.eventName.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
  this.totalPages = Math.ceil(this.filteredEvents.length / this.eventsPerPage);
  this.currentPage = 1;
  this.updatePagedEvents();
}
// Update events to be displayed based on the current page
updatePagedEvents(): void {
  const startIndex = (this.currentPage - 1) * this.eventsPerPage;
  const endIndex = startIndex + this.eventsPerPage;
  this.pagedEvents = this.filteredEvents.slice(startIndex, endIndex);
}
// Change page and update events
changePage(page: number): void {
  if (page > 0 && page <= this.totalPages) {
    this.currentPage = page;
    this.updatePagedEvents();
  }
}

  // Handle search functionality
  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.filteredEvents = this.events.filter(event =>
        event.eventName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredEvents = [...this.events];
    }
    this.totalPages = Math.ceil(this.filteredEvents.length / this.eventsPerPage);
    this.currentPage = 1; // Reset to the first page after search
    this.updatePagedEvents();
  }

  approveBooking(bookingId: number) {
    this.bookingService.approveBooking(bookingId).subscribe((response) => {
      this.toastr.success('Approved Succesful');
       // Update the bookings list by removing the approved booking
       this.bookings = this.bookings.filter((booking) => booking.bookingId !== bookingId);

       // Optionally, refresh the event list to reflect changes (if needed)
       this.getEvents();
     },
     (error) => {
       console.error('Error approving booking:', error);
       this.toastr.error('Error while approving booking');
     }
   );
  }
  declineBooking(bookingId:number)
  {
    this.bookingService.deleteBooking(bookingId).subscribe(() => {
      this.toastr.success('Declined Succesful');
       // Update the bookings list by removing the approved booking
       this.bookings = this.bookings.filter((booking) => booking.bookingId !== bookingId);
       this.getBookings();
      this.getEvents(); // Refresh events after deleting an event
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

  addEvent(): void {
    if (!this.selectedFile) {
      this.toastr.error('Event image file is required.');
      return;
    }

    const formData = new FormData();
    formData.append('eventName', this.newEvent.eventName);
    formData.append('description', this.newEvent.description);
    formData.append('category', this.newEvent.category);
    formData.append('startDate', this.newEvent.startDate);
    formData.append('location', this.newEvent.location);
    formData.append('eventImageFile', this.selectedFile);

    this.bookingService.addEvent(formData).subscribe(
      (response) => {
        this.toastr.success('Service added successfully!');
        this.closeModal();
        this.getEvents();
        console.log('Response:', response);
        // Reset the form after success
        this.newEvent = {
          eventName: '',
          description: '',
          category: '',
          startDate: '',
          location: '',
        };
        this.selectedFile = null;
      },
      (error) => {
        console.error('Error while adding event:', error);
        this.toastr.error('Failed to add event.');
      }
    );
  }
  editEvent(eventData: EventList): void {
    const formData = new FormData();
  
    // Append all event fields to FormData
    formData.append('eventId', eventData.eventId.toString());
    formData.append('eventName', eventData.eventName);
    formData.append('description', eventData.description);
    formData.append('category', eventData.category);
    formData.append('startDate', eventData.startDate);
    formData.append('location', eventData.location);
  
    // Only append the file if it has been selected
    if (this.selectedFile) {
      formData.append('eventImageFile', this.selectedFile);
    }
  
    this.bookingService.updateEvent(eventData.eventId, formData).subscribe(
      (response) => {
        this.toastr.success('Service Updated Successfully');
        this.getEvents(); // Refresh the events list
        this.closeModal(); // Close the modal or dialog
        this.selectedFile = null; // Reset the file input
      },
      (error) => {
        console.error('Error while updating event', error);
        this.toastr.error('Failed to update the event.');
      }
    );
  }
  

  deleteEvent(eventId: number) {
    this.bookingService.deleteEvent(eventId).subscribe(() => {
      this.toastr.success('Service Deleted Succesful')
      this.getEvents(); // Refresh events after deleting an event
    });
  }
  openModal(event: EventList | null = null) {
    if (event) {
      this.isEditMode = true;
      this.currentEvent = { ...event }; // Pre-fill form for editing
      // Ensure the startDate is formatted as YYYY-MM-DD for the input[type="date"]
    if (this.currentEvent.startDate) {
      const date = new Date(this.currentEvent.startDate);
      this.currentEvent.startDate = date.toISOString().split('T')[0]; // Format the date to YYYY-MM-DD
    }
    } else {
      this.isEditMode = false;
      this.currentEvent = {eventId:0, eventName: '', description: '', startDate: '',location:'',category:'' }; // Set blank values for adding
    }
    // Open modal logic (use a library like Bootstrap or custom modal)
  }

  closeModal() {
    this.isEditMode = false;
    this.currentEvent = null;
    // Close modal logic
  }
}
