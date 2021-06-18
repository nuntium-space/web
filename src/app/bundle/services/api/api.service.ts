import { Injectable } from '@angular/core';
import { CoreApiService, IApiServiceResponse } from 'src/app/core/services/api/api.service';
import { IBundle, IPrice, IPublisher } from 'src/app/services/api/api.service';

@Injectable()
export class ApiService extends CoreApiService
{
  public async updateBundle(id: string, data: {
    name?: string,
    active?: boolean,
  }): Promise<IApiServiceResponse<IBundle>>
  {
    return this.send("PATCH", `bundles/${id}`, data);
  }

  public async createPrice(bundleId: string, data: {
    amount: number,
    currency: string,
  }): Promise<IApiServiceResponse<IPrice>>
  {
    return this.send("POST", `bundles/${bundleId}/prices`, data);
  }

  public async listPricesForBundle(id: string, options?: {
    active: boolean,
  }): Promise<IApiServiceResponse<IPrice[]>>
  {
    return this.send("GET", `bundles/${id}/prices${(options && "active" in options) ? `?active=${options.active}` : ""}`);
  }

  public async updatePrice(id: string, data: {
    active?: boolean,
  }): Promise<IApiServiceResponse<IPrice>>
  {
    return this.send("PATCH", `prices/${id}`, data);
  }

  public async addPublisherToBundle(bundleId: string, publisherId: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("POST", `bundles/${bundleId}/publishers/${publisherId}`);
  }

  public async listPublishersForBundle(id: string): Promise<IApiServiceResponse<IPublisher[]>>
  {
    return this.send("GET", `bundles/${id}/publishers`);
  }

  public async listPublishersForOrganization(organizationId: string, options?: { not_in_bundle?: string }): Promise<IApiServiceResponse<IPublisher[]>>
  {
    return this.send("GET", `organizations/${organizationId}/publishers${
      options?.not_in_bundle
        ? `?not_in_bundle=${options.not_in_bundle}`
        : ""
    }`);
  }

  public async removePublisherFromBundle(bundleId: string, publisherId: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `bundles/${bundleId}/publishers/${publisherId}`);
  }

  public async subscribeToPrice(userId: string, priceId: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("POST", `users/${userId}/subscriptions`, { price: priceId });
  }
}
