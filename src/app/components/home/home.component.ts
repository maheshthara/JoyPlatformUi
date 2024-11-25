import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
// Mock Data for Events
constructor(private router:Router){}
events = [
  {
    title: 'Hatfield 8 Ball Pool Meet',
    imageUrl: 'assets/images/newham1.jpeg',
  },
  {
    title: 'Mental health',
    imageUrl: 'https://via.placeholder.com/300x200?text=Mingles+Introductions',
  },
  {
    title: 'Special Sunday Session',
    imageUrl: 'https://via.placeholder.com/300x200?text=Sunday+Session',
  },
  {
    title: 'Wellbeing Treasures',
    imageUrl: 'https://via.placeholder.com/300x200?text=Wellbeing+Treasures',
  },
];
register(){
  this.router.navigate(['/signup'])
}

}