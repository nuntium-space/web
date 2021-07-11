import { Injectable } from '@angular/core';
import {
  CoreApiService,
  IApiServiceResponse,
} from 'src/app/core/services/api/api.service';
import { IArticle, IAuthor, IPublisher } from 'src/app/services/api/api.service';

export interface IAuthorInvite {
  id: string;
  user_email: string;
  publisher: IPublisher;
  created_at: string;
  expires_at: string;
}

export interface IViewTimeSeriesEntry {
  article: IArticle,
  timestamp: string,
}

@Injectable()
export class ApiService extends CoreApiService {
  public listAuthorsForPublisher(
    publisherId: string
  ): Promise<IApiServiceResponse<IAuthor[]>> {
    return this.send('GET', `publishers/${publisherId}/authors?expand[]=user`);
  }

  public retrieveInvites(
    publisherId: string
  ): Promise<IApiServiceResponse<IAuthorInvite[]>> {
    return this.send(
      'GET',
      `publishers/${publisherId}/authors/invites?expand[]=user`
    );
  }

  public inviteAuthor(
    publisherId: string,
    data: {
      email: string;
    }
  ): Promise<IApiServiceResponse<void>> {
    return this.send('POST', `publishers/${publisherId}/authors/invites`, data);
  }

  public deleteInvite(inviteId: string): Promise<IApiServiceResponse<void>> {
    return this.send('DELETE', `authors/invites/${inviteId}`);
  }

  public deleteAuthor(authorId: string): Promise<IApiServiceResponse<void>> {
    return this.send('DELETE', `authors/${authorId}`);
  }

  public retrievePublisher(
    id: string
  ): Promise<IApiServiceResponse<IPublisher>> {
    return this.send('GET', `publishers/${id}`);
  }

  public updatePublisher(
    id: string,
    data: {
      name?: string;
      url?: string;
    }
  ): Promise<IApiServiceResponse<IPublisher>> {
    return this.send('PATCH', `publishers/${id}`, data);
  }

  public updatePublisherImage(
    id: string,
    data: {
      image: File;
    }
  ): Promise<IApiServiceResponse<{ url: string }>> {
    const fd = new FormData();
    fd.append('image', data.image);

    return this.send(
      'PUT',
      `publishers/${id}/image`,
      fd,
      'multipart/form-data'
    );
  }

  public retrievePublisherVerificationData(
    publisherId: string
  ): Promise<IApiServiceResponse<{ dns: { record: string } }>> {
    return this.send('GET', `publishers/${publisherId}/verification/data`);
  }

  public verifyPublisher(
    publisherId: string
  ): Promise<IApiServiceResponse<void>> {
    return this.send('POST', `publishers/${publisherId}/verify`);
  }

  public retrieveViewsTimeSeriesData(publisher: IPublisher, data: { from: Date, to: Date, precision: "day" | "hour" }): Promise<IApiServiceResponse<IViewTimeSeriesEntry[]>>
  {
    return this.send("GET", `publishers/${publisher.id}/timeseries/views?from=${data.from.toISOString()}&to=${data.to.toISOString()}&precision=${data.precision}`);
  }
}
