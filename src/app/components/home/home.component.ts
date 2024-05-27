import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { snippets } from '../../shared/snippets';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,MatTooltipModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
 
  searchTerm = '';
  snippets= snippets;

  ngOnInit(): void {
  }

  get filteredTopics() {
    return this.snippets.filter((topic:any) => topic.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
}
}
