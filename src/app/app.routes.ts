import { Routes } from '@angular/router';
import { Home } from "./components/home/home";
import { Login } from "./components/login/login";
import { Registo } from "./components/registo/registo";
import { MinhasListas } from "./components/minhas-listas/minhas-listas";
import { authGuard } from "./guards/auth-guard";

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'registo', component: Registo },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'minhas-listas', component: MinhasListas, canActivate: [authGuard] }
];
