import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { snippets } from '../../shared/snippets';
import { DataService } from '../../services/data.service';
import { JsonPipe } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchPanelComponent } from '../../shared/search-panel/search-panel.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    MatTooltipModule,
    JsonPipe,
    NgOptimizedImage,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    SearchPanelComponent,
    NgxSpinnerModule
  ],
  providers: [DataService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  searchTerm = '';
  snippets: any[] | null = null;
  error: { message: string; status: number; statusText: string } | null = null;

  constructor(
    private data: DataService,
    private snackbar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show("loadSnippets");
    this.data.getImage()
    .pipe(tap(() => this.spinner.hide("loadSnippets")))
    .subscribe({
      next: (data: any) => {
        this.snippets = data.map((image: any) => ({
          ...image,
          isLoading: true,
        }));
        this.error = null;
      },
      error: (err) => {
        console.log('error fetching details', err);
        this.snippets = [];
        this.error = err;
      },
    });

    this.data.searchInput.subscribe((searchTerm) => {
      console.log('search term', searchTerm);
      this.searchTerm = searchTerm;
    });
  }

  get filteredTopics() {
    return this.snippets?.filter((topic: any) =>
      topic.author.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onImageLoad(snippet: any) {
    console.log('image loaded', snippet);
    setTimeout(() => {
      snippet.isLoading = false;
    }, 500);
  }

  downloadSnippet(snippet: any) {
    this.data.downloadImage(snippet.download_url, snippet.author).subscribe({
      next: () => {
        this.snackbar.open('Image downloaded successfully', 'Ok', {
          duration: 10000,
        });
      },
      error: (err) => {
        this.snackbar.open('Error downloading image', 'Ok', {
          duration: 10000,
        });
      },
    });
  }
}
