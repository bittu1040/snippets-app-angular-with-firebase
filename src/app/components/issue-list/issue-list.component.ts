import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Issue } from '../../shared/issues';
import { AddIssuesComponent } from '../add-issues/add-issues.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatCardModule, MatDividerModule],
  templateUrl: './issue-list.component.html',
  styleUrl: './issue-list.component.scss'
})
export class IssueListComponent implements OnInit{

  features: Issue[] = [];
  bugs: Issue[] = [];
  readonly dialog = inject(MatDialog);

  constructor(private data: DataService) {
    
  }

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
    this.data.getAllIssues().subscribe({
      next: (data: any) => {
        this.features= data.filter((issue: Issue) => issue.issueType === "Feature");
        this.bugs = data.filter((issue: Issue) => issue.issueType === "Bug");
      },
      error: (err) => {
        console.log("error fetching details", err)
      }
    })
  }
  openAddIssueDialog() {
    const dialogRef = this.dialog.open(AddIssuesComponent);
    dialogRef.afterClosed().subscribe(result => {
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

}
