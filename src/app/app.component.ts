import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from './dialogs/logout-dialog/logout-dialog.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, RouterLink, RouterLinkActive, MatButtonModule],
  providers: [AuthService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'snippets-app';
  isLoggedIn: boolean = false
  constructor(public _authService: AuthService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  openDialog() {
   const dialogRef= this.dialog.open(LogoutDialogComponent);
   dialogRef.afterClosed().subscribe(result => {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'false';
  });
  }



}
