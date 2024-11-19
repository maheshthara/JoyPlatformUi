import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;
  formSubmitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Initialize the form with controls and validators
  createForm() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Getter for easy access to form controls in the template
  get f() {
    return this.contactForm.controls;
  }

  // Submit the form
  onSubmit() {
    this.formSubmitted = true;
    
    if (this.contactForm.invalid) {
      return; // If the form is invalid, don't proceed
    }

    const formData = this.contactForm.value;

    this.contactService.submitContactForm(formData).subscribe(
      () => {
        this.successMessage = 'Your message has been sent successfully!';
        this.contactForm.reset(); // Reset the form after successful submission
      },
      () => {
        this.errorMessage = 'There was an error sending your message. Please try again later.';
      }
    );
  }
}
