import { Injectable } from '@angular/core';
import { CoreApiService, IApiServiceResponse } from 'src/app/core/services/api/api.service';
import { IArticle, IUser } from 'src/app/services/api/api.service';

@Injectable()
export class ApiService extends CoreApiService
{
  public async retrieveArticle(id: string): Promise<IApiServiceResponse<IArticle>>
  {
    return this.send("GET", `articles/${id}?expand[]=author&expand[]=author.user&expand[]=author.publisher`);
  }

  public async updateArticle(articleId: string, data: {
    title: string,
    content: string,
  }): Promise<IApiServiceResponse<IArticle>>
  {
    return this.send("PATCH", `articles/${articleId}?expand[]=author&expand[]=author.user&expand[]=author.publisher`, data);
  }

  public async deleteArticle(articleId: string): Promise<IApiServiceResponse<IArticle>>
  {
    return this.send("DELETE", `articles/${articleId}`);
  }

  public async createBookmark(user: IUser, article: IArticle): Promise<IApiServiceResponse<void>>
  {
    return this.send("POST", `users/${user.id}/bookmarks`, { article: article.id });
  }

  public async deleteBookmark(user: IUser, article: IArticle): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `users/${user.id}/bookmarks`, { article: article.id });
  }

  public async addLike(user: IUser, article: IArticle): Promise<IApiServiceResponse<void>>
  {
    return this.send("POST", `users/${user.id}/likes`, { article: article.id });
  }

  public async removeLike(user: IUser, article: IArticle): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `users/${user.id}/likes`, { article: article.id });
  }
}
