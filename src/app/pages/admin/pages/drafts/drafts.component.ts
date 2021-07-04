import { Component, OnInit } from '@angular/core';
import { IArticleDraft } from 'src/app/pages/draft/services/api/api.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'admin-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss'],
})
export class DraftsComponent implements OnInit {
  public drafts?: IArticleDraft[];

  constructor(private api: ApiService) {}

  public ngOnInit() {
    this.api.retrieveDraftsSubmittedForVerification().then((response) => {
      this.drafts = response.data;
    });
  }
}
