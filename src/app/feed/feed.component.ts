import { Component } from '@angular/core';
import { ApiService, IArticle } from '../services/api/api.service';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent
{
  public articles?: IArticle[];

  constructor(auth: AuthService, api: ApiService)
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
}
