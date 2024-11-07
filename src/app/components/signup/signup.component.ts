import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserRegistration } from '../../models/UserRegistration';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
      this.signupForm = this.fb.group({
          username: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', Validators.required]
      });
  }

  onSubmit() {
      if (this.signupForm.valid) {
        const user: UserRegistration = this.signupForm.value;
          this.authService.signUp(user).subscribe({
              next: (response) => {
                  console.log('Signup successful:', response);
                  alert('Signup successful!');
              },
              error: (error) => {
                  console.error('Signup failed:', error);
                  alert('Signup failed. Please try again.');
              }
          });
      }
  }
}
