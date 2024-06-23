import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

import {MatDialogModule,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef,
} from '@angular/material/dialog';
import { FirebaseAuthService } from '../../services/firebase-auth.service';

@Component({
  selector: 'app-logout-dialog',
  standalone: true,
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.scss'
})
export class LogoutDialogComponent {

  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private dialogRef: MatDialogRef<LogoutDialogComponent>
  ) {}


  confirmLogout() {
    this.firebaseAuthService.logout().then(() => {
      this.dialogRef.close();
    });
  }
}
