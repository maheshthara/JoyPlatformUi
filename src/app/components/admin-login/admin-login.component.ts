import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserLogin } from '../../models/UserLogin';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {
  signinForm:FormGroup
  constructor(private authService: AuthService, private router: Router,private fb:FormBuilder,private toastr:ToastrService) {
    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  ngOnInit(): void {}

  signin() {
    // Here, you would typically call a service to handle signin
    if(this.signinForm.valid){
    const userLogin: UserLogin = this.signinForm.value;
    this.authService.Adminlogin(userLogin).subscribe({
      next: (response) => {
        this.authService.isAdminLoggedIn()
          console.log('Signin successful:', response);
          this.toastr.success(`${userLogin.username}`, 'Welcome to Joy');
          this.router.navigate(['/admin/dashboard']);
        },
      error: (error) => {
          console.error('Signin failed:', error);
          this.toastr.warning('Invalid UserName or Password');
      }
  });
}
}
}
