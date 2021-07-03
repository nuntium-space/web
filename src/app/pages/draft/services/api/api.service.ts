import { Injectable } from '@angular/core';
import { CoreApiService, IApiServiceResponse } from 'src/app/core/services/api/api.service';
import { IAuthor, IArticle } from 'src/app/services/api/api.service';

export interface IArticleDraft
{
  id: string,
  title: string,
  content: any,
  author: IAuthor,
  article: IArticle | null,
  status: "draft" | "pending-verification",
  created_at: string,
  updated_at: string,
}

export interface IArticleDraftSource
{
  url: string,
}

@Injectable()
export class ApiService extends CoreApiService
{
  public async retrieveDraft(id: string): Promise<IApiServiceResponse<IArticleDraft>>
  {
    return this.send("GET", `articles/drafts/${id}?expand[]=author&expand[]=author.user&expand[]=author.publisher`);
  }

  public async retrieveDraftSources(id: string): Promise<IApiServiceResponse<IArticleDraftSource[]>>
  {
    return this.send("GET", `articles/drafts/${id}/sources`);
  }

  public async submitForVerification(draft: IArticleDraft): Promise<IApiServiceResponse<void>>
  {
    return this.send("POST", `articles/drafts/${draft.id}/verify`);
  }

  public async publish(draft: IArticleDraft): Promise<IApiServiceResponse<void>>
  {
    return this.send("POST", `__internals/articles/drafts/${draft.id}/publish`);
  }

  public async reject(draft: IArticleDraft, data: {
    reason: string,
  }): Promise<IApiServiceResponse<void>>
  {
    return this.send("POST", `__internals/articles/drafts/${draft.id}/reject`);
  }

  public async updateDraft(draft: IArticleDraft, data: {
    title?: string,
    content?: string,
    sources?: IArticleDraftSource[],
  }): Promise<IApiServiceResponse<IArticleDraft>>
  {
    return this.send("PATCH", `articles/drafts/${draft.id}?expand[]=author&expand[]=author.user&expand[]=author.publisher`, data);
  }

  public async deleteDraft(draft: IArticleDraft): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `articles/drafts/${draft.id}`);
  }
}
