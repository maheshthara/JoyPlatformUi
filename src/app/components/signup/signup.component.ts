import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  user = {
    email: '',
    password: ''
  };

  onSignup() {
    // Here, you would typically call a service to handle signup
    console.log('User signed up:', this.user);
    // Reset form or navigate to another page after successful signup
  }

}
