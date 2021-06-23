import { Injectable } from '@angular/core';
import { CoreApiService, IApiServiceResponse } from 'src/app/core/services/api/api.service';
import { IArticle, IAuthor, IBundle, IPublisher } from 'src/app/services/api/api.service';

@Injectable()
export class ApiService extends CoreApiService
{
  public async listArticlesForPublisher(publisherId: string): Promise<IApiServiceResponse<IArticle[]>>
  {
    return this.send("GET", `publishers/${publisherId}/articles?expand[]=author&expand[]=author.user`);
  }

  public async listBundlesForPublisher(publisherId: string): Promise<IApiServiceResponse<IBundle[]>>
  {
    return this.send("GET", `publishers/${publisherId}/bundles`);
  }

  public async retrievePublisher(id: string): Promise<IApiServiceResponse<IPublisher>>
  {
    return this.send("GET", `publishers/${id}`);
  }

  public async createArticle(authorId: string, data: {
    title: string,
    content: any,
    sources: { url: string }[],
  }): Promise<IApiServiceResponse<IArticle>>
  {
    return this.send("POST", `authors/${authorId}/articles`, data);
  }

  public async retrieveAuthorForUserAndPublisher(userId: string, publisherId: string): Promise<IApiServiceResponse<[ IAuthor ]>>
  {
    return this.send("GET", `users/${userId}/authors?publisher=${publisherId}`);
  }
}
