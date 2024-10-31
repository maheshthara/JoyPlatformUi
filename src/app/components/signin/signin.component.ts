import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  user = {
    email: '',
    password: ''
  };

  onSignin() {
    // Here, you would typically call a service to handle signin
    console.log('User signed in:', this.user);
    // Navigate to another page after successful signin
  }
}
