import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-add-issues',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule,MatDialogActions],
  templateUrl: './add-issues.component.html',
  styleUrl: './add-issues.component.scss'
})
export class AddIssuesComponent {

  addIssueForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder){

  }

  ngOnInit(){
    this.addIssueForm = this.fb.group({
      userName: ['', ],
      issueType: ['', Validators.required],
      issue: ['', Validators.required],
      issueDescription: ['',]
  });
  }

  onSubmit() {
    console.log(this.addIssueForm.value);
  }


}
