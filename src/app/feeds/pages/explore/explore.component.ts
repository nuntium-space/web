import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IArticle, IPublisher } from '../../../services/api/api.service';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'feeds-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit
{
  public searchQuery: string = "";
  public isLoadingSearchResults = false;

  public articles?: IArticle[];
  public trendingArticles?: IArticle[];
  public recentlyViewedArticles?: IArticle[];

  public publishers?: IPublisher[];

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

        this.articles = undefined;
        this.publishers = undefined;

        if (this.searchQuery.trim().length === 0)
        {
          return;
        }

        this.isLoadingSearchResults = true;

        const response = await this.api.search(this.searchQuery, 0);

        this.isLoadingSearchResults = false;

        this.articles = response.data?.articles;
        this.publishers = response.data?.publishers;
      },
    });

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
