import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProfileComponent } from './components/profile/profile.component';

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
    }
];
