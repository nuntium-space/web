import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IArticle } from '../services/api/api.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent
{
  public searchQuery: string = "";

  public articles?: IArticle[];

  constructor(api: ApiService, route: ActivatedRoute)
  {
    route.queryParams.subscribe({
      next: async queryParams =>
      {
        this.searchQuery = (queryParams.query as string | undefined) ?? "";
        this.articles = [];

        if (this.searchQuery.trim().length === 0)
        {
          return;
        }

        const response = await api.search(this.searchQuery, 0);

        this.articles = response.data;
      },
    });
  }
}
