import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../../services/data.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-issues',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogActions,
    NgxSpinnerModule
  ],
  templateUrl: './add-issues.component.html',
  styleUrl: './add-issues.component.scss',
})
export class AddIssuesComponent {
  addIssueForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddIssuesComponent>,
    private data: DataService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit() {
    this.addIssueForm = this.fb.group({
      userName: [''],
      issueType: ['', Validators.required],
      issue: ['', Validators.required],
      issueDescription: [''],
    });
  }

  onSubmit() {
    if (this.addIssueForm.valid) {
      this.spinner.show('postingIssue');
      console.log(this.addIssueForm.value);
      this.data.addIssue(this.addIssueForm.value)
      .subscribe((issue) => {
        this.data.allIssuesSubject.next(issue);
        this.addIssueForm.reset();
        this.spinner.hide('postingIssue');
        this.dialogRef.close(this.addIssueForm.value);
      });
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
