import { Injectable } from '@angular/core';
import { CoreApiService, IApiServiceResponse } from 'src/app/core/services/api/api.service';
import { IAuthor, IPublisher } from 'src/app/services/api/api.service';

@Injectable()
export class ApiService extends CoreApiService
{
  public async listAuthorsForPublisher(publisherId: string): Promise<IApiServiceResponse<IAuthor[]>>
  {
    return this.send("GET", `publishers/${publisherId}/authors?expand[]=user`);
  }

  public async inviteAuthor(publisherId: string, data: {
    email: string,
  }): Promise<IApiServiceResponse<IAuthor[]>>
  {
    return this.send("POST", `publishers/${publisherId}/authors`, data);
  }

  public async deleteAuthor(authorId: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `authors/${authorId}`);
  }

  public async retrievePublisher(id: string): Promise<IApiServiceResponse<IPublisher>>
  {
    return this.send("GET", `publishers/${id}`);
  }

  public async updatePublisher(id: string, data: {
    name?: string,
    url?: string,
  }): Promise<IApiServiceResponse<IPublisher>>
  {
    return this.send("PATCH", `publishers/${id}`, data);
  }

  public async updatePublisherImage(id: string, data: {
    image: File,
  }): Promise<IApiServiceResponse<{ url: string }>>
  {
    const fd = new FormData();
    fd.append("image", data.image);

    return this.send("PUT", `publishers/${id}/image`, fd, "multipart/form-data");
  }

  public async retrievePublisherVerificationData(publisherId: string): Promise<IApiServiceResponse<{ dns: { record: string } }>>
  {
    return this.send("GET", `publishers/${publisherId}/verification/data`);
  }

  public async verifyPublisher(publisherId: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("POST", `publishers/${publisherId}/verify`);
  }
}
