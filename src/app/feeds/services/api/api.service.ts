import { Injectable } from '@angular/core';
import { CoreApiService, IApiServiceResponse } from 'src/app/core/services/api/api.service';
import { IArticle, IPublisher, IUser } from 'src/app/services/api/api.service';
import { Config } from 'src/config/Config';

export interface IBookmark
{
  article: IArticle,
  created_at: string,
}

export interface ILike
{
  article: IArticle,
}

@Injectable()
export class ApiService extends CoreApiService
{
  public async search(query: string, page: number): Promise<IApiServiceResponse<{
    articles: IArticle[],
    publishers: IPublisher[],
  }>>
  {
    return this.send("GET", `search?query=${encodeURIComponent(query)}&limit=${Config.FEED_PAGE_SIZE}&offset=${page * Config.FEED_PAGE_SIZE}&expand[]=author&expand[]=author.user&expand[]=author.publisher`);
  }

  public async retrieveHistory(user: IUser): Promise<IApiServiceResponse<IArticle[]>>
  {
    return this.send("GET", `users/${user.id}/history?expand[]=author&expand[]=author.user&expand[]=author.publisher`);
  }

  public async listBookmarks(user: IUser): Promise<IApiServiceResponse<IBookmark[]>>
  {
    return this.send("GET", `users/${user.id}/bookmarks?expand[]=article&expand[]=article.author&expand[]=article.author.user&expand[]=article.author.publisher`);
  }

  public async listLikes(user: IUser): Promise<IApiServiceResponse<ILike[]>>
  {
    return this.send("GET", `users/${user.id}/likes?expand[]=article&expand[]=article.author&expand[]=article.author.user&expand[]=article.author.publisher`);
  }
}
