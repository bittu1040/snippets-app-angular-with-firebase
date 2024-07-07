import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { AsyncPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../../dialogs/logout-dialog/logout-dialog.component';
import { DeviceDetectorService } from '../service/device-detector.service';
import { SidebarService } from '../service/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  firebaseAuth = inject(FirebaseAuthService);
  isLoggedIn: boolean = false;
  isSidebarVisible = signal(false);
  deviceDetectorService = inject(DeviceDetectorService);
  isSmallDevice = signal(false);
  sidebarService = inject(SidebarService);
  router = inject(Router);

  public dialog = inject(MatDialog);

  constructor() {}

  ngOnInit(): void {
    this.firebaseAuth.checkAuthStatus();
    this.firebaseAuth.isLoggedInSubject.subscribe((res) => {
      this.isLoggedIn = res;
    });

    this.deviceDetectorService.getIsSmallDevice().subscribe((res) => {
      this.isSidebarVisible.set(!res);
      this.isSmallDevice.set(res);
    });

    this.sidebarService.sidebarState.subscribe((res) => {
      this.isSidebarVisible.set(res);
    });
  }

  openLogoutDialog() {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  toggle() {
    this.sidebarService.toggleSidebar();
  }

  route(path: string) {
    if (this.isSmallDevice()) {
      this.toggle();
    }
    this.router.navigate([path]);
  }
}
