import { Injectable } from '@angular/core';
import { CoreApiService, IApiServiceResponse } from 'src/app/core/services/api/api.service';
import { IArticleDraft } from 'src/app/publisher-public-page/services/api/api.service';

@Injectable()
export class ApiService extends CoreApiService
{
  public async retrieveDraft(id: string): Promise<IApiServiceResponse<IArticleDraft>>
  {
    return this.send("GET", `articles/drafts/${id}?expand[]=author&expand[]=author.user&expand[]=author.publisher`);
  }

  public async updateDraft(draft: IArticleDraft, data: {
    title: string,
    content: string,
  }): Promise<IApiServiceResponse<IArticleDraft>>
  {
    return this.send("PATCH", `articles/drafts/${draft.id}?expand[]=author&expand[]=author.user&expand[]=author.publisher`, data);
  }

  public async deleteDraft(draft: IArticleDraft): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `articles/drafts/${draft.id}`);
  }
}
