import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UploadSnippetsComponent } from './components/upload-snippets/upload-snippets.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginRedirectsComponent } from './components/login-redirects/login-redirects.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: "", redirectTo:"/home", pathMatch: "full"},
    {path: "home", component: HomeComponent},
    {path: "upload-snippets", component: UploadSnippetsComponent, canActivate: [authGuard]},
    {path: "login", component: LoginComponent},
    {path: "signup", component: SignupComponent},
    { path: 'login-redirect', component: LoginRedirectsComponent },
];
