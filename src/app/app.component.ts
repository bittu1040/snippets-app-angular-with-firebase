import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from './dialogs/logout-dialog/logout-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { FirebaseAuthService } from './services/firebase-auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, MatButtonModule],
  providers: [AuthService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'snippets-app';
  isLoggedIn: boolean = false
  constructor(public _authService: AuthService, private firebaseAuthService: FirebaseAuthService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.firebaseAuthService.isLoggedIn.subscribe(res => {
      this.isLoggedIn = res;
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(LogoutDialogComponent,
      {
        width: '350px',
      }
    );
    dialogRef.afterClosed().subscribe(result => {

    });
  }



}
