import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventList } from '../../models/Events';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
// Mock Data for Events
constructor(private router:Router,private eventService:EventService){}
events:EventList[]=[]

ngOnInit(){
  this.loadEvents();
}
loadEvents() {
  this.eventService.getEvents().subscribe(
    (data) => {
      
      this.events = data.map(event=>{
        event.imageUrl= `https://localhost:7171${event.imageUrl}`;
        return event;
      });
      this.events = data;
})
}
register(){
  const token = localStorage.getItem('jwtToken'); // Retrieve token from localStorage
  if(!token){
  this.router.navigate(['/signup']);
  }
  else{
    this.router.navigate(['/event-list']);
  }
}

}