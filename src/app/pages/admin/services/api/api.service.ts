import { Injectable } from '@angular/core';
import {
  CoreApiService,
  IApiServiceResponse,
} from 'src/app/core/services/api/api.service';
import { IArticleDraft } from 'src/app/pages/draft/services/api/api.service';

@Injectable()
export class ApiService extends CoreApiService {
  public retrieveDraftsSubmittedForVerification(): Promise<
    IApiServiceResponse<IArticleDraft[]>
  > {
    return this.send(
      'GET',
      `__internals/articles/drafts/submitted?expand[]=author&expand[]=author.user&expand[]=author.publisher`
    );
  }
}
