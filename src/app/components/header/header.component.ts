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
  showResources = false;
  resources = [
    { label: 'Health Tips', link: '/resources/health-tips' },
    { label: 'Nutrition Plans', link: '/resources/nutrition-plans' },
    { label: 'Exercise Guides', link: '/resources/exercise-guides' },
    { label: 'Mental Wellness Articles', link: '/resources/mental-wellness' },
    { label: 'Community Forums', link: '/resources/community-forums' },
    { label: 'Educational Videos', link: '/resources/educational-videos' },
    { label: 'Professional Directory', link: '/resources/professionals' }
  ];

  isLoggedIn: boolean = false;  // Default login state

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the login status observable
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;  // Update the login state
    });
    console.log(this.isLoggedIn);
  }
  navigateToResource(link: string): void {
    this.router.navigate([link]);
  }
  logout(): void {
    this.authService.logout();  // Call logout from AuthService
    this.router.navigate(['/signin']); // Redirect to sign-in page
  }
}

