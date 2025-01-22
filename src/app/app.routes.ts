import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import('./login/login.component').then(m => LoginComponent)
    },
    {
        path: "login",
        redirectTo: ""
    },
    {
        path: "registration",
        loadComponent: () => import('./registration/registration.component').then(m => RegistrationComponent)
    },
    {
        path: "home",
        loadComponent: () => import('./home/home.component').then(m => HomeComponent)
    },
    {
        path: "chat",
        loadComponent: () => import('./chat/chat.component').then(m => ChatComponent)
    }
];
