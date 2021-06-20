import { Component } from '@angular/core';
import { IArticle } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'feeds-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent
{
  public articles?: IArticle[];

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
        this.articles = response.data;
      });
  }
}
