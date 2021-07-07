import { Component, OnInit } from '@angular/core';
import { ApiService, IArticleReport } from '../../services/api/api.service';

@Component({
  selector: 'admin-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  public reports?: IArticleReport[];

  constructor(private api: ApiService) {}

  public ngOnInit() {
    this.api.retrieveReports().then((response) => {
      this.reports = response.data;
    });
  }
}
