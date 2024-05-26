import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UploadSnippetsComponent } from './components/upload-snippets/upload-snippets.component';

export const routes: Routes = [
    {path: "", redirectTo:"/home", pathMatch: "full"},
    {path: "home", component: HomeComponent},
    {path: "upload-snippets", component: UploadSnippetsComponent}
];
