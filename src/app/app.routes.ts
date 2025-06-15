import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { BookingConfirmationComponent } from './components/booking-confirmation/booking-confirmation.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { JoinComponent } from './components/join/join.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path:'',component:HomeComponent
    },
    {
        path:'home',component:HomeComponent
    },
    {
        path:'signup',component:SignupComponent
    },
    {
        path:'signin',component:SigninComponent
    },
    {
        path:'about',component:AboutComponent
    },
    {path:'contact',component:ContactComponent},
    {
        path:'profile',component:ProfileComponent
    },
    {
        path:'event-list',component:EventListComponent
    },
    {
        path:'book-event/:id',component:BookingConfirmationComponent
    },
    {
        path:'admin/login',component:AdminLoginComponent
    },
    {path:'login',component:LoginComponent},
    {
        path:'admin/dashboard',component:AdminDashboardComponent
    },
    {
        path:'addEvent',component:AddEventComponent
    },
    {
        path:'join',component:JoinComponent
    },
    {path:'my-bookings',component:MyBookingsComponent},
    
];
