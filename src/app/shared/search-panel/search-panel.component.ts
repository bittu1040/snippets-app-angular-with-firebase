import { Component, OnInit, inject } from '@angular/core';
import { DeviceDetectorService } from '../service/device-detector.service';
import { AsyncPipe } from '@angular/common';
import { SidebarService } from '../service/sidebar.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-search-panel',
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  templateUrl: './search-panel.component.html',
  styleUrl: './search-panel.component.scss',
})
export class SearchPanelComponent implements OnInit {
  isSmallDevice = inject(DeviceDetectorService).getIsSmallDevice();
  sidebarService = inject(SidebarService);
  dataService = inject(DataService);

  searchTerm: string = '';

  toggle() {
    this.sidebarService.toggleSidebar();
  }

  ngOnInit(): void {
  }

  getSearchInputData(event: any) {
    this.searchTerm = event.target.value;
    this.dataService.searchInput.next(this.searchTerm);
  }

}
