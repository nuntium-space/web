import { Injectable } from '@angular/core';
import {
  CoreApiService,
  IApiServiceResponse,
} from 'src/app/core/services/api/api.service';
import { IArticle, IUser } from 'src/app/services/api/api.service';

export interface IArticleSource {
  url: string;
}

@Injectable()
export class ApiService extends CoreApiService {
  public async retrieveArticle(
    id: string
  ): Promise<IApiServiceResponse<IArticle>> {
    return this.send(
      'GET',
      `articles/${id}?expand[]=author&expand[]=author.user&expand[]=author.publisher`
    );
  }

  public async retrieveSources(
    id: string
  ): Promise<IApiServiceResponse<IArticleSource[]>> {
    return this.send('GET', `articles/${id}/sources`);
  }

  public async createDraftFromArticle(
    article: IArticle
  ): Promise<IApiServiceResponse<{ id: string }>> {
    return this.send('POST', `articles/${article.id}/drafts`);
  }

  public async deleteArticle(
    articleId: string
  ): Promise<IApiServiceResponse<IArticle>> {
    return this.send('DELETE', `articles/${articleId}`);
  }

  public async createBookmark(
    user: IUser,
    article: IArticle
  ): Promise<IApiServiceResponse<void>> {
    return this.send('POST', `users/${user.id}/bookmarks`, {
      article: article.id,
    });
  }

  public async deleteBookmark(
    user: IUser,
    article: IArticle
  ): Promise<IApiServiceResponse<void>> {
    return this.send('DELETE', `users/${user.id}/bookmarks`, {
      article: article.id,
    });
  }

  public async addLike(
    user: IUser,
    article: IArticle
  ): Promise<IApiServiceResponse<void>> {
    return this.send('POST', `users/${user.id}/likes`, { article: article.id });
  }

  public async removeLike(
    user: IUser,
    article: IArticle
  ): Promise<IApiServiceResponse<void>> {
    return this.send('DELETE', `users/${user.id}/likes`, {
      article: article.id,
    });
  }
}
