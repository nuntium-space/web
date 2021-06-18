import { Injectable } from '@angular/core';
import { CoreApiService, IApiServiceResponse } from 'src/app/core/services/api/api.service';
import { IArticle, IComment } from 'src/app/services/api/api.service';
import { ArticleModule } from '../../article.module';

@Injectable({
  providedIn: ArticleModule,
})
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

  public async createComment(articleId: string, data: {
    content: string,
    parent: string | null,
  }): Promise<IApiServiceResponse<IComment>>
  {
    return this.send("POST", `articles/${articleId}/comments?expand[]=user`, data);
  }

  public async listCommentsForArticle(id: string, parent: string | null): Promise<IApiServiceResponse<IComment[]>>
  {
    return this.send("GET", `articles/${id}/comments?${parent !== null ? `parent=${parent}&` : ""}expand[]=user`);
  }
}
