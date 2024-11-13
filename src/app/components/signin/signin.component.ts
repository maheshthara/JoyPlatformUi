import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserLogin } from '../../models/UserLogin';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,RouterLinkActive,ReactiveFormsModule  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
signinForm:FormGroup
constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private toastr:ToastrService){
  this.signinForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
});
}
  signin() {
    // Here, you would typically call a service to handle signin
    if(this.signinForm.valid){
    const userLogin: UserLogin = this.signinForm.value;
    this.authService.login(userLogin).subscribe({
      next: (response) => {
          console.log('Signin successful:', response);
          this.toastr.success(`${userLogin.username}`, 'Welcome to Joy');
          this.router.navigate(['/home']);
        },
      error: (error) => {
          console.error('Signin failed:', error);
          this.toastr.warning('Invalid UserName or Password');
      }
  });
}
}
}
