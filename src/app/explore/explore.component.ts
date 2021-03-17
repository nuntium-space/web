import { Component } from '@angular/core';
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

  constructor(private api: ApiService)
  {}

  public async onSearch(query: string)
  {
    const response = await this.api.search(query, 0);

    this.articles = response.data;
  }
}
