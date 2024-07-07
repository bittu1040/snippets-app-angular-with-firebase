import { Component, inject } from '@angular/core';
import { DeviceDetectorService } from '../service/device-detector.service';
import { AsyncPipe } from '@angular/common';
import { SidebarService } from '../service/sidebar.service';

@Component({
  selector: 'app-search-panel',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './search-panel.component.html',
  styleUrl: './search-panel.component.scss',
})
export class SearchPanelComponent {
  isSmallDevice = inject(DeviceDetectorService).getIsSmallDevice();
  sidebarService = inject(SidebarService);

  toggle() {
    this.sidebarService.toggleSidebar();
  }
}
