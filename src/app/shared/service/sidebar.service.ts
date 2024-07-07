import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class SidebarService {
  sidebarState = new BehaviorSubject<boolean>(true);

  toggleSidebar() {
    this.sidebarState.next(!this.sidebarState.value);
  }
}
