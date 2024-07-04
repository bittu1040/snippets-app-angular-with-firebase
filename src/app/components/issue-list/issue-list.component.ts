import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Issue, Issues } from '../../shared/issues';
import { AddIssuesComponent } from '../add-issues/add-issues.component';

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

  ngOnInit(): void {
    this.features = Issues.filter((issue) => issue.issueType === "Feature");
    this.bugs = Issues.filter((issue) => issue.issueType === "Bug");
  }
  openAddIssueDialog() {
    const dialogRef = this.dialog.open(AddIssuesComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // console.log(result)
      }
    });
  }

}
