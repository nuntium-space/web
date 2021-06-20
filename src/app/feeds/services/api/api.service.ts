import { Injectable } from '@angular/core';
import { CoreApiService, IApiServiceResponse } from 'src/app/core/services/api/api.service';
import { IArticle, IPublisher } from 'src/app/services/api/api.service';
import { Config } from 'src/config/Config';

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
}
