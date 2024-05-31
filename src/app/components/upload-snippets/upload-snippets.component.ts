import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-upload-snippets',
  standalone: true,
  imports: [HttpClientModule, MatButtonModule],
  templateUrl: './upload-snippets.component.html',
  styleUrl: './upload-snippets.component.scss'
})
export class UploadSnippetsComponent {

  selectedFile!: File;

  constructor(private http: HttpClient){

  }
  onFileChanged(event:any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile, this.selectedFile.name);

    this.http.post('your-server-endpoint', uploadData, { reportProgress: true })
      .subscribe(response => {
        console.log(response);
        // Handle successful upload response
      }, error => {
        console.error(error);
        // Handle upload error
      });
  }
}
