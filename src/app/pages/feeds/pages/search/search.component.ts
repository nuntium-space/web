import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IArticle, IPublisher } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'feeds-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit
{
  public searchQuery: string = "";
  public isLoadingSearchResults = false;

  public articles?: IArticle[];

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

        if (response.success)
        {
          this.articles = response.data.articles;
          this.publishers = response.data.publishers;
        }
      },
    });
  }
}
