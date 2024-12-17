import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs';

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
    { label: 'Register', route: '/signup' },
    { label: 'Log In', route: '/login' },
    { label: 'About', route: '/about' },
    { label: 'Profile', route: '/profile' },
    { label: 'Events', route: '/event-list' },
    // { label: 'AdminSign', route: '/admin/login' },
    {label:'How to join',route:'/join'},
    {label:'Contact',route:'/contact'}

  ]
  adminLinks = [
    { label: 'Admin Dashboard', route: '/admin/dashboard' }
  ];
  showResources = false;
  resources = [
    { label: 'MyBookings', link: '/my-bookings' },
    { label: 'Nutrition Plans', link: '/resources/nutrition-plans' },
    { label: 'Exercise Guides', link: '/resources/exercise-guides' },
    { label: 'Mental Wellness Articles', link: '/resources/mental-wellness' }
  ];

  isLoggedIn: boolean = false;  // Default login state
  isAdmin: boolean = false;  // Flag to determine if the user is an admin
  currentRoute: string = '';

  constructor(private authService: AuthService, private router: Router) {
   }

  ngOnInit(): void {
    // Subscribe to the login status observable
    this.authService.isAdmin$.subscribe((status) => {
      this.isAdmin = status;  // Update the login state
    });
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;  // Update the login state
    });
    console.log(this.isLoggedIn);
     // Listen to route changes
     this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url; // Update current route on navigation
    });
  }
  navigateToResource(link: string): void {
    this.router.navigate([link]);
  }
  // Check if the route is active
  isRouteActive(route: string): boolean {
    return this.currentRoute === route;
  }
  logout(): void {
    this.authService.logout();  // Call logout from AuthService
    this.router.navigate(['/login']); // Redirect to sign-in page
  }
  eventList(){
    const token = localStorage.getItem('jwtToken'); // Retrieve token from localStorage
    if(!token){
    this.router.navigate(['/signup']);
    }
    else{
      this.router.navigate(['/event-list']);
    }
  }
}

