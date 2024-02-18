import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { HomeComponent } from './components/shared/home/home.component';
import { UserComponent } from './components/user/user.component';


export const routes: Routes = [
    {path:'', redirectTo:'/login', pathMatch: 'full'},
    {path:'login', component:LoginComponent},
    {path:'home', component:HomeComponent},
    {path:'user', component:UserComponent}
];
