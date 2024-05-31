import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { snippets } from '../../shared/snippets';
import { DataService } from '../../services/data.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,MatTooltipModule, JsonPipe ],
  providers: [DataService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
 
  searchTerm = '';
  snippets: any[]=[];
  error: { message: string, status: number, statusText: string } | null = null;


  constructor(private data: DataService){

  }

  ngOnInit(): void {
    this.data.getImage().subscribe({
      next:(data:any)=>{
        this.snippets= data;
        this.error= null;
      }, 
      error:(err)=>{
        console.log("error fetching details", err)
        this.error= err;
      }
    })
  }

  get filteredTopics() {
    return this.snippets.filter((topic:any) => topic.author.toLowerCase().includes(this.searchTerm.toLowerCase()));
}
}
