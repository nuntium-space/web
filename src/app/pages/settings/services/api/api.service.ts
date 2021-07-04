import { Injectable } from '@angular/core';
import {
  CoreApiService,
  IApiServiceResponse,
} from 'src/app/core/services/api/api.service';
import { IAuthorInvite } from 'src/app/pages/publisher/services/api/api.service';
import {
  IAuthor,
  IOrganization,
  IPaymentMethod,
  ISubscription,
  IUser,
  IUserSettings,
} from 'src/app/services/api/api.service';

export interface IAccount {
  id: string;
  display_name: string;
  is_linked: boolean;
}

@Injectable()
export class ApiService extends CoreApiService {
  public async listAuthorsForUser(
    userId: string
  ): Promise<IApiServiceResponse<IAuthor[]>> {
    return this.send('GET', `users/${userId}/authors?expand[]=publisher`);
  }

  public async updateUser(
    id: string,
    data: {
      full_name?: string;
      email?: string;
    }
  ): Promise<IApiServiceResponse<IUser>> {
    return this.send('PATCH', `users/${id}`, data);
  }

  public async deleteUser(id: string): Promise<IApiServiceResponse<void>> {
    return this.send('DELETE', `users/${id}`);
  }

  public async listOrganizationsForUser(
    userId: string
  ): Promise<IApiServiceResponse<IOrganization[]>> {
    return this.send('GET', `users/${userId}/organizations`);
  }

  public async createOrganization(data: {
    name: string;
  }): Promise<IApiServiceResponse<{ id: string }>> {
    return this.send('POST', 'organizations', data);
  }

  public async deleteOrganization(
    id: string
  ): Promise<IApiServiceResponse<void>> {
    return this.send('DELETE', `organizations/${id}`);
  }

  public async listPaymentMethodsForUser(
    userId: string
  ): Promise<IApiServiceResponse<IPaymentMethod[]>> {
    return this.send('GET', `users/${userId}/payment-methods`);
  }

  public async addPaymentMethodToUser(
    userId: string,
    data: {
      id: string;
    }
  ): Promise<IApiServiceResponse<void>> {
    return this.send('POST', `users/${userId}/payment-methods`, data);
  }

  public async setDefaultPaymentMethod(
    userId: string,
    data: {
      id: string;
    }
  ): Promise<IApiServiceResponse<void>> {
    return this.send('PUT', `users/${userId}/payment-methods/default`, data);
  }

  public async deletePaymentMethod(
    id: string
  ): Promise<IApiServiceResponse<void>> {
    return this.send('DELETE', `payment-methods/${id}`);
  }

  public async updateUserSettings(
    userId: string,
    data: {
      language?: string;
    }
  ): Promise<IApiServiceResponse<IUserSettings>> {
    return this.send('PATCH', `users/${userId}/settings`, data);
  }

  public async createBillingPortalSession(
    userId: string
  ): Promise<IApiServiceResponse<{ url: string }>> {
    return this.send('GET', `users/${userId}/stripe/portal`);
  }

  public async listSubscriptionsForUser(
    userId: string
  ): Promise<IApiServiceResponse<ISubscription[]>> {
    return this.send(
      'GET',
      `users/${userId}/subscriptions?expand[]=price&expand[]=price.bundle`
    );
  }

  public async retrieveInvites(
    user: IUser
  ): Promise<IApiServiceResponse<IAuthorInvite[]>> {
    return this.send(
      'GET',
      `users/${user.id}/authors/invites?expand[]=publisher`
    );
  }

  public async acceptInvite(
    invite: IAuthorInvite
  ): Promise<IApiServiceResponse<void>> {
    return this.send('POST', `authors/invites/${invite.id}/accept`);
  }

  public async retrieveLinkedAccounts(
    user: IUser
  ): Promise<IApiServiceResponse<IAccount[]>> {
    return this.send('GET', `users/${user.id}/accounts`);
  }

  public async unlinkAccount(
    user: IUser,
    account: IAccount
  ): Promise<IApiServiceResponse<void>> {
    return this.send('DELETE', `users/${user.id}/accounts/${account.id}`);
  }
}
