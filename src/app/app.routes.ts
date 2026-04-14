import { Routes } from '@angular/router';
import { Home } from "./components/home/home";
import { Login } from "./components/login/login";
import { Registo } from "./components/registo/registo";

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'registo', component: Registo },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
