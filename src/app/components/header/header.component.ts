import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  headerLinks = [
    { label: 'Home', route: '/' },
    { label: 'Sign Up', route: '/signup' },
    { label: 'Sign In', route: '/signin' },
    { label: 'About', route: '/about' },
    {label:'Profile',route:'/profile'}

  ]

  isLoggedIn: boolean = false;  // Default login state

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the login status observable
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;  // Update the login state
    });
  }

  logout(): void {
    this.authService.logout();  // Call logout from AuthService
    this.router.navigate(['/signin']); // Redirect to sign-in page
  }
}

