import { Injectable } from '@angular/core';
import { CoreApiService, IApiServiceResponse } from 'src/app/core/services/api/api.service';
import { IAuthor, IOrganization, IPaymentMethod, ISubscription, IUser, IUserSettings } from 'src/app/services/api/api.service';

@Injectable()
export class ApiService extends CoreApiService
{
  public async listAuthorsForUser(userId: string): Promise<IApiServiceResponse<IAuthor[]>>
  {
    return this.send("GET", `users/${userId}/authors?expand[]=publisher`);
  }

  public async updateUser(id: string, data: {
    full_name?: string,
    email?: string,
  }): Promise<IApiServiceResponse<IUser>>
  {
    return this.send("PATCH", `users/${id}`, data);
  }

  public async deleteUser(id: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `users/${id}`);
  }

  public async listOrganizationsForUser(userId: string): Promise<IApiServiceResponse<IOrganization[]>>
  {
    return this.send("GET", `users/${userId}/organizations`);
  }

  public async createOrganization(data: {
    name: string,
  }): Promise<IApiServiceResponse<IOrganization>>
  {
    return this.send("POST", "organizations", data);
  }

  public async deleteOrganization(id: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `organizations/${id}`);
  }

  public async listPaymentMethodsForUser(userId: string): Promise<IApiServiceResponse<IPaymentMethod[]>>
  {
    return this.send("GET", `users/${userId}/payment-methods`);
  }

  public async addPaymentMethodToUser(userId: string, data: {
    id: string,
  }): Promise<IApiServiceResponse<void>>
  {
    return this.send("POST", `users/${userId}/payment-methods`, data);
  }

  public async setDefaultPaymentMethod(userId: string, data: {
    id: string,
  }): Promise<IApiServiceResponse<void>>
  {
    return this.send("PUT", `users/${userId}/payment-methods/default`, data);
  }

  public async deletePaymentMethod(id: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `payment-methods/${id}`);
  }

  public async updateUserSettings(userId: string, data: {
    language?: string,
  }): Promise<IApiServiceResponse<IUserSettings>>
  {
    return this.send("PATCH", `users/${userId}/settings`, data);
  }

  public async createBillingPortalSession(userId: string): Promise<IApiServiceResponse<{ url: string }>>
  {
    return this.send("GET", `users/${userId}/stripe/portal`);
  }

  public async listSubscriptionsForUser(userId: string): Promise<IApiServiceResponse<ISubscription[]>>
  {
    return this.send("GET", `users/${userId}/subscriptions?expand[]=price&expand[]=price.bundle`);
  }
}
