import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventList } from '../../models/Events';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-confirmation.component.html',
  styleUrl: './booking-confirmation.component.css'
})
export class BookingConfirmationComponent implements OnInit {
  eventId!:number
  event: EventList | undefined;
  bookingError: string | undefined;
  constructor(private route: ActivatedRoute, private eventservice: EventService,private router:Router,private toastr:ToastrService) { }

  ngOnInit() {
    this.eventId = +this.route.snapshot.paramMap.get('id')!;
   
      this.eventservice.getEventById(this.eventId.toString()).subscribe(eventData => {
        eventData.imageUrl=`https://localhost:7171${eventData.imageUrl}`;
        this.event=eventData
        console.log(this.event)
      });
  }


  confirmationBooking() {
    this.eventservice.bookEvent(this.eventId).subscribe((response) => {
      this.toastr.success('Booking Succesful wait for Approval and check you Email');
      this.router.navigate(['/event-list']);
    },
      error => {
        console.error("error booking event", error)
        alert('Failed to Book Event');
      });
  }


}
