import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IArticle } from '../services/api/api.service';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit
{
  public searchQuery: string = "";

  public articles?: IArticle[];

  public recentlyViewedArticles?: IArticle[];

  constructor(private api: ApiService, private auth: AuthService, private route: ActivatedRoute)
  {}

  public ngOnInit()
  {
    if (!this.auth.user)
    {
      return;
    }

    this.route.queryParams.subscribe({
      next: async queryParams =>
      {
        this.searchQuery = (queryParams.query as string | undefined) ?? "";

        if (this.searchQuery.trim().length === 0)
        {
          return;
        }

        const response = await this.api.search(this.searchQuery, 0);

        this.articles = response.data;
      },
    });

    this.api
      .retrieveRecentlyViewedArticles(this.auth.user.id)
      .then(response =>
      {
        this.recentlyViewedArticles = response.data;
      })
  }
}
