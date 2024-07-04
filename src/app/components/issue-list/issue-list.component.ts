import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Issue, Issues } from '../../shared/issues';

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
  ngOnInit(): void {
    this.features = Issues.filter((issue) => issue.issueType === "Feature");
    this.bugs = Issues.filter((issue) => issue.issueType === "Bug");
  }
  openPostIssueDialog() {
    // TODO
  }

}
