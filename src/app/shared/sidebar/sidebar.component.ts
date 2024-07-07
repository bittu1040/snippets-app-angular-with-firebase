import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { AsyncPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../../dialogs/logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  firebaseAuth = inject(FirebaseAuthService);
  isLoggedIn: boolean = false;

  public dialog= inject(MatDialog);


  constructor() { }

  ngOnInit(): void {
    this.firebaseAuth.checkAuthStatus();
    this.firebaseAuth.isLoggedInSubject.subscribe((res) => {
      this.isLoggedIn = res;
    });
  }

  openLogoutDialog() {
    const dialogRef = this.dialog.open(LogoutDialogComponent,
      {
        width: '350px',
      }
    );
    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
