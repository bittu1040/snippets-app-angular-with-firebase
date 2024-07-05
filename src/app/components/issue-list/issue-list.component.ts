import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Issue } from '../../shared/issues';
import { AddIssuesComponent } from '../add-issues/add-issues.component';
import { DataService } from '../../services/data.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { delay, tap } from 'rxjs';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatCardModule, MatDividerModule, MatSnackBarModule, MatProgressSpinnerModule],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.scss',
})
export class IssueListComponent implements OnInit {
  features: Issue[] | null = null;
  bugs: Issue[] | null = null;
  isLoading: boolean = true;
  readonly dialog = inject(MatDialog);

  constructor(private data: DataService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // this.features = Issues.filter((issue) => issue.issueType === "Feature");
    // this.bugs = Issues.filter((issue) => issue.issueType === "Bug");

    this.getAllIssues();

    // this.data.allIssuesSubject.subscribe((newIssue: Issue) => {
    //   if (newIssue.issueType === 'Feature') {
    //     this.features.push(newIssue);
    //   } else if (newIssue.issueType === 'Bug') {
    //     this.bugs.push(newIssue);
    //   }
    // });
  }

  getAllIssues() {
    this.data.getAllIssues()
    .pipe(
      tap(() => this.isLoading = false)
    ).subscribe({
      next: (data: any) => {
        this.features = data.filter(
          (issue: Issue) => issue.issueType === 'Feature'
        );
        this.bugs = data.filter((issue: Issue) => issue.issueType === 'Bug');
      },
      error: (err) => {
        this.snackBar.open("Error fetching details", "Ok", {
          duration: 10000
        });
        console.log('error fetching details', err);
        this.features = [];
        this.bugs = [];
      },
    });
  }
  
  openAddIssueDialog() {
    const dialogRef = this.dialog.open(AddIssuesComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getAllIssues();
      }
    });
  }

  deleteIssue(id: string): void {
    this.data.deleteIssue(id).subscribe(() => {
      this.getAllIssues();
    });
  }

  refreshData(){
    this.isLoading = true;
    this.getAllIssues();
  }
}
