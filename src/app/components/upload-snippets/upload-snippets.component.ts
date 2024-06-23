import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-upload-snippets',
  standalone: true,
  imports: [HttpClientModule, MatButtonModule],
  templateUrl: './upload-snippets.component.html',
  styleUrl: './upload-snippets.component.scss'
})
export class UploadSnippetsComponent implements OnInit {

  selectedFile?: File;

  constructor(private http: HttpClient) { }


  ngOnInit(): void {
    
  }
  onFileChanged(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
    } else {
      this.selectedFile = undefined;
    }
  }

  onUpload() {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile, this.selectedFile.name);

    this.http.post('your-server-endpoint', uploadData, { reportProgress: true })
      .subscribe({
        next: response => {
          console.log(response);
          // Handle successful upload response
        },
        error: err => {
          console.error(err);
          // Handle upload error
        }
      });
  }
}
