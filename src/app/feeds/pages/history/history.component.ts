import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ApiService, IHistoryEntry } from '../../services/api/api.service';

@Component({
  selector: 'feeds-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent
{
  public entries?: IHistoryEntry[];

  constructor(private api: ApiService, private auth: AuthService)
  {}

  public ngOnInit()
  {
    if (!this.auth.user)
    {
      return;
    }

    this.api
      .retrieveHistory(this.auth.user)
      .then(response =>
      {
        this.entries = response.data;
      });
  }

  public async clearHistory()
  {}
}
