import { Injectable } from '@angular/core';
import { Config } from 'src/config/Config';
import { environment } from 'src/environments/environment';

export interface IApiServiceResponse<T>
{
  status: number,
  success: boolean,
  /**
   * Body of the request, if successful
   */
  data?: T,
  errors?: {
    field: string,
    error: string,
    params?: any,
  }[],
  /**
   * Body of the request
   */
  raw?: any,
}

export interface IUser
{
  id: string,
  full_name: string | null,
  email: string,
}

export interface IOrganization
{
  id: string,
  name: string,
  owner: IUser,
  stripe_account_enabled: boolean,
}

export interface IPublisher
{
  id: string,
  name: string,
  url: string,
  organization: IOrganization,
  verified: boolean,
  imageUrl: string | null,
  __metadata?: {
    is_author: boolean,
    is_subscribed: boolean,
  },
}

export interface IAuthor
{
  id: string,
  user: IUser,
  publisher: IPublisher,
}

export interface IArticle
{
  id: string,
  title: string,
  content: any,
  reading_time: number,
  author: IAuthor,
  created_at: string,
  updated_at: string,
}

export interface IComment
{
  id: string,
  content: string,
  user: IUser,
  article: IArticle,
  parent: IComment | null,
  reply_count: number,
  created_at: string,
  updated_at: string,
}

export interface ISession
{
  id: string,
  user: IUser,
  expires_at: string,
}

export interface IBundle
{
  id: string,
  name: string,
  organization: IOrganization,
  active: boolean,
}

export interface IPrice
{
  id: string,
  amount: number,
  currency: string,
  bundle: IBundle,
  active: boolean,
}

export interface ISource
{
  id: string,
  url: string,
}

export interface ISubscription
{
  id: string,
  status: string,
  user: IUser,
  price: IPrice,
  current_period_end: string,
  cancel_at_period_end: boolean,
  deleted: boolean,
}

export interface IPaymentMethod
{
  id: string,
  type: string,
  data: any,
  user: IUser,
  __metadata?: {
    is_default: boolean,
  },
}

export interface IUserSettings
{
  language: string | null,
}

@Injectable({
  providedIn: 'root'
})
export class ApiService
{
  constructor()
  {}

  private async send(
    method: "DELETE" | "GET" | "PATCH" | "POST" | "PUT",
    url: string,
    body?: any,
    contentType: "application/json" | "multipart/form-data" = "application/json",
  ): Promise<IApiServiceResponse<any>>
  {
    const headers: HeadersInit = {};

    if (contentType !== "multipart/form-data")
    {
      headers["Content-Type"] = contentType;
    }

    const response = await fetch(`${environment.api.endpoint}/${url}`, {
      method,
      headers,
      body: contentType === "application/json"
        ? JSON.stringify(body)
        : body,
      credentials: "include",
    });

    const result: IApiServiceResponse<any> = {
      status: response.status,
      success: response.status >= 200 && response.status < 300,
    };

    // No Content
    if (result.status === 204)
    {
      return result;
    }

    const json = await response.json();

    result.raw = json;

    if (response.status !== 200)
    {
      result.errors = json.details;
    }
    else
    {
      result.data = json;
    }

    return result;
  }

  /**
   * RESOURCES
   */

  public async retrieveTrendingArticles(): Promise<IApiServiceResponse<IArticle[]>>
  {
    return this.send("GET", `articles/trending?expand[]=author&expand[]=author.user&expand[]=author.publisher`);
  }

  public async retrieveRecentlyViewedArticles(userId: string): Promise<IApiServiceResponse<IArticle[]>>
  {
    return this.send("GET", `users/${userId}/articles/recent?expand[]=author&expand[]=author.user&expand[]=author.publisher`);
  }

  public async retrieveSignInRequest(id: string): Promise<IApiServiceResponse<{ session?: ISession }>>
  {
    return this.send("GET", `auth/email/requests/${id}`);
  }

  public async signInWithEmail(email: string): Promise<IApiServiceResponse<{ id: string }>>
  {
    return this.send("POST", "auth/email", { email });
  }

  public async createArticle(authorId: string, data: {
    title: string,
    content: any,
    sources: { url: string }[],
  }): Promise<IApiServiceResponse<IArticle>>
  {
    return this.send("POST", `authors/${authorId}/articles`, data);
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

  public async deletePaymentMethod(id: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `payment-methods/${id}`);
  }

  public async listArticlesForPublisher(publisherId: string): Promise<IApiServiceResponse<IArticle[]>>
  {
    return this.send("GET", `publishers/${publisherId}/articles?expand[]=author&expand[]=author.user`);
  }

  public async listBundlesForPublisher(publisherId: string): Promise<IApiServiceResponse<IBundle[]>>
  {
    return this.send("GET", `publishers/${publisherId}/bundles`);
  }

  public async search(query: string, page: number): Promise<IApiServiceResponse<{
    articles: IArticle[],
    publishers: IPublisher[],
  }>>
  {
    return this.send("GET", `search?query=${encodeURIComponent(query)}&limit=${Config.FEED_PAGE_SIZE}&offset=${page * Config.FEED_PAGE_SIZE}&expand[]=author&expand[]=author.user&expand[]=author.publisher`);
  }

  public async retrievePublisher(id: string): Promise<IApiServiceResponse<IPublisher>>
  {
    return this.send("GET", `publishers/${id}`);
  }

  public async retrieveCurrentSession(): Promise<IApiServiceResponse<ISession>>
  {
    return this.send("GET", `sessions/current`);
  }

  public async deleteCurrentSession(): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `sessions/current`);
  }

  public async retrieveUser(id: string): Promise<IApiServiceResponse<IUser>>
  {
    return this.send("GET", `users/${id}`);
  }

  public async retrieveUserFeed(userId: string, page: number): Promise<IApiServiceResponse<IArticle[]>>
  {
    return this.send("GET", `users/${userId}/feed?expand[]=author&expand[]=author.user&expand[]=author.publisher&limit=${Config.FEED_PAGE_SIZE}&offset=${page * Config.FEED_PAGE_SIZE}`);
  }

  public async listOrganizationsForUser(userId: string): Promise<IApiServiceResponse<IOrganization[]>>
  {
    return this.send("GET", `users/${userId}/organizations`);
  }

  public async listPaymentMethodsForUser(userId: string): Promise<IApiServiceResponse<IPaymentMethod[]>>
  {
    return this.send("GET", `users/${userId}/payment-methods`);
  }

  public async listAuthorsForUser(userId: string): Promise<IApiServiceResponse<IAuthor[]>>
  {
    return this.send("GET", `users/${userId}/authors?expand[]=publisher`);
  }

  public async retrieveUserSettings(userId: string): Promise<IApiServiceResponse<IUserSettings>>
  {
    return this.send("GET", `users/${userId}/settings`);
  }

  public async createBillingPortalSession(userId: string): Promise<IApiServiceResponse<{ url: string }>>
  {
    return this.send("GET", `users/${userId}/stripe/portal`);
  }

  public async listSubscriptionsForUser(userId: string): Promise<IApiServiceResponse<ISubscription[]>>
  {
    return this.send("GET", `users/${userId}/subscriptions?expand[]=price&expand[]=price.bundle`);
  }

  public async addPaymentMethodToUser(userId: string, data: {
    id: string,
  }): Promise<IApiServiceResponse<void>>
  {
    return this.send("POST", `users/${userId}/payment-methods`, data);
  }

  public async updateUser(id: string, data: {
    full_name?: string,
    email?: string,
  }): Promise<IApiServiceResponse<IUser>>
  {
    return this.send("PATCH", `users/${id}`, data);
  }

  public async updateUserSettings(userId: string, data: {
    language?: string,
  }): Promise<IApiServiceResponse<IUserSettings>>
  {
    return this.send("PATCH", `users/${userId}/settings`, data);
  }

  public async setDefaultPaymentMethod(userId: string, data: {
    id: string,
  }): Promise<IApiServiceResponse<void>>
  {
    return this.send("PUT", `users/${userId}/payment-methods/default`, data);
  }

  public async deleteUser(id: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `users/${id}`);
  }
}
