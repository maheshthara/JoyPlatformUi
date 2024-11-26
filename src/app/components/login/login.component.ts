import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserLogin } from '../../models/UserLogin';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  currentRole: string = 'user'; // Default: User login form is active


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
    this.authService.userLogin(userLogin).subscribe({
      next: (response) => {
          console.log('Signin successful:', response);
          this.toastr.success(`${userLogin.username}`, 'Welcome to Joy');
          this.router.navigate(['/event-list']);
        },
      error: (error) => {
          console.error('Signin failed:', error);
          this.toastr.warning('Invalid UserName or Password');
      }
  });
}
}

  adminSignin() {
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
  switchRole(role: string) {
    this.currentRole = role;
  }
}
