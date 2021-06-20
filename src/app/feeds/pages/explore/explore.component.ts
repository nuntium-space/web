import { Component, OnInit } from '@angular/core';
import { ApiService, IArticle } from '../../../services/api/api.service';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'feeds-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit
{
  public trendingArticles?: IArticle[];
  public recentlyViewedArticles?: IArticle[];

  constructor(private api: ApiService, private auth: AuthService)
  {}

  public ngOnInit()
  {
    if (!this.auth.user)
    {
      return;
    }

    this.api
      .retrieveTrendingArticles()
      .then(response =>
      {
        this.trendingArticles = response.data;
      });

    this.api
      .retrieveRecentlyViewedArticles(this.auth.user.id)
      .then(response =>
      {
        this.recentlyViewedArticles = response.data;
      });
  }
}
