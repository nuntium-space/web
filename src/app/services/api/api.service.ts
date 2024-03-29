import { Injectable } from '@angular/core';
import {
  CoreApiService,
  IApiServiceResponse,
} from 'src/app/core/services/api/api.service';
import { Config } from 'src/config/Config';

export interface IUser {
  id: string;
  type: 'admin' | 'user';
  full_name: string | null;
  email: string;
  imageUrl: string;
}

export interface IOrganization {
  id: string;
  name: string;
  owner: IUser;
  stripe_account_enabled: boolean;
}

export interface IPublisher {
  id: string;
  name: string;
  url: string;
  organization: IOrganization;
  verified: boolean;
  imageUrl: string;
  __metadata?: {
    is_author: boolean;
    is_subscribed: boolean;
  };
}

export interface IAuthor {
  id: string;
  user: IUser;
  publisher: IPublisher;
}

export interface IArticle {
  id: string;
  title: string;
  reading_time: number;
  author: IAuthor;
  created_at: string;
  updated_at: string;
  __metadata?: {
    is_liked: boolean;
    is_bookmarked: boolean;
  };
}

export interface ISession {
  id: string;
  user: IUser;
  expires_at: string;
}

export interface IBundle {
  id: string;
  name: string;
  organization: IOrganization;
  active: boolean;
}

export interface IPrice {
  id: string;
  amount: number;
  currency: string;
  billing_period: 'month' | 'week' | 'year';
  bundle: IBundle;
  active: boolean;
}

export interface ISource {
  id: string;
  url: string;
}

export interface ISubscription {
  id: string;
  status: string;
  user: IUser;
  price: IPrice;
  current_period_end: string;
  cancel_at_period_end: boolean;
  deleted: boolean;
}

export interface IPaymentMethod {
  id: string;
  type: string;
  data: any;
  user: IUser;
  __metadata?: {
    is_default: boolean;
  };
}

export interface IUserSettings {
  language: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService extends CoreApiService {
  public retrieveSignInRequest(
    id: string
  ): Promise<IApiServiceResponse<{ session: ISession }>> {
    return this.send('GET', `auth/email/requests/${id}`);
  }

  public signInWithEmail(
    email: string
  ): Promise<IApiServiceResponse<{ id: string }>> {
    return this.send('POST', 'auth/email', { email });
  }

  public retrieveCurrentSession(): Promise<IApiServiceResponse<ISession>> {
    return this.send('GET', `sessions/current`);
  }

  public deleteCurrentSession(): Promise<IApiServiceResponse<void>> {
    return this.send('DELETE', `sessions/current`);
  }

  public retrieveUser(id: string): Promise<IApiServiceResponse<IUser>> {
    return this.send('GET', `users/${id}`);
  }

  public retrieveUserFeed(
    userId: string,
    page: number
  ): Promise<IApiServiceResponse<IArticle[]>> {
    return this.send(
      'GET',
      `users/${userId}/feed?expand[]=author&expand[]=author.user&expand[]=author.publisher&limit=${
        Config.FEED_PAGE_SIZE
      }&offset=${page * Config.FEED_PAGE_SIZE}`
    );
  }

  public retrieveUserSettings(
    userId: string
  ): Promise<IApiServiceResponse<IUserSettings>> {
    return this.send('GET', `users/${userId}/settings`);
  }
}
