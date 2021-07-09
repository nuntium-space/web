import { Injectable } from '@angular/core';
import {
  CoreApiService,
  IApiServiceResponse,
} from 'src/app/core/services/api/api.service';
import {
  IArticle,
  IAuthor,
} from 'src/app/services/api/api.service';

@Injectable()
export class ApiService extends CoreApiService {
  public listArticlesForAuthor(
    id: string
  ): Promise<IApiServiceResponse<IArticle[]>> {
    return this.send(
      'GET',
      `authors/${id}/articles?expand[]=author&expand[]=author.user&expand[]=author.publisher`
    );
  }

  public retrieveAuthor(
    id: string
  ): Promise<IApiServiceResponse<IAuthor>> {
    return this.send('GET', `authors/${id}?expand[]=user`);
  }
}
