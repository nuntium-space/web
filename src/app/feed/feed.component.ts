import { Component } from '@angular/core';
import { ApiService, IArticle } from '../services/api/api.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent
{
  public articles?: IArticle[];

  constructor(public api: ApiService, public auth: AuthService)
  {
    if (!auth.user)
    {
      return;
    }

    api.retrieveUserFeed(auth.user.id, 0).then(response =>
    {
      this.articles = response.data;
    });
  }

  public async onSearch(query: string)
  {
    const response = await this.api.search(query, 0);

    this.articles = response.data;
  }
}
