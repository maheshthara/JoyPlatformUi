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
  },
  (error)=>{
    console.error('Error fecthing events',error)
  });
}

  
}
