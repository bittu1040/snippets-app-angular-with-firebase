import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class SidebarService {
  sidebarState = new BehaviorSubject<boolean>(false);

  toggleSidebar() {
    this.sidebarState.next(!this.sidebarState.value);
  }
}
