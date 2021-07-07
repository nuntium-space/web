import { Injectable } from '@angular/core';
import {
  CoreApiService,
  IApiServiceResponse,
} from 'src/app/core/services/api/api.service';
import { IArticle, IPublisher, IUser } from 'src/app/services/api/api.service';
import { Config } from 'src/config/Config';

export interface IBookmark {
  article: IArticle;
  created_at: string;
}

export interface IHistoryEntry {
  article: IArticle;
  last_viewed_at: string;
}

export interface ILike {
  article: IArticle;
}

@Injectable()
export class ApiService extends CoreApiService {
  public search(
    query: string,
    page: number
  ): Promise<
    IApiServiceResponse<{
      articles: IArticle[];
      publishers: IPublisher[];
    }>
  > {
    return this.send(
      'GET',
      `search?query=${encodeURIComponent(query)}&limit=${
        Config.FEED_PAGE_SIZE
      }&offset=${
        page * Config.FEED_PAGE_SIZE
      }&expand[]=author&expand[]=author.user&expand[]=author.publisher`
    );
  }

  public retrieveHistory(
    user: IUser
  ): Promise<IApiServiceResponse<IHistoryEntry[]>> {
    return this.send(
      'GET',
      `users/${user.id}/history?expand[]=article&expand[]=article.author&expand[]=article.author.user&expand[]=article.author.publisher`
    );
  }

  public deleteHistory(user: IUser): Promise<IApiServiceResponse<void>> {
    return this.send('DELETE', `users/${user.id}/history`);
  }

  public listBookmarks(
    user: IUser
  ): Promise<IApiServiceResponse<IBookmark[]>> {
    return this.send(
      'GET',
      `users/${user.id}/bookmarks?expand[]=article&expand[]=article.author&expand[]=article.author.user&expand[]=article.author.publisher`
    );
  }

  public listLikes(user: IUser): Promise<IApiServiceResponse<ILike[]>> {
    return this.send(
      'GET',
      `users/${user.id}/likes?expand[]=article&expand[]=article.author&expand[]=article.author.user&expand[]=article.author.publisher`
    );
  }

  public retrieveTrendingArticles(): Promise<
    IApiServiceResponse<IArticle[]>
  > {
    return this.send(
      'GET',
      `articles/trending?expand[]=author&expand[]=author.user&expand[]=author.publisher`
    );
  }
}
