import { Injectable } from '@angular/core';
import { Config } from 'src/config/Config';
import { environment } from 'src/environments/environment';

export interface IApiServiceResponse<T>
{
  status: number,
  success: boolean,
  data?: T,
  errors?: {
    field: string,
    error: string,
    params?: any,
  }[],
}

export interface IUser
{
  id: string,
  full_name: string | null,
  username: string | null,
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

  public async retrieveArticle(id: string): Promise<IApiServiceResponse<IArticle>>
  {
    return this.send("GET", `articles/${id}?expand[]=author&expand[]=author.user&expand[]=author.publisher`);
  }

  public async retrieveTrendingArticles(): Promise<IApiServiceResponse<IArticle[]>>
  {
    return this.send("GET", `articles/trending?expand[]=author&expand[]=author.user&expand[]=author.publisher`);
  }

  public async retrieveRecentlyViewedArticles(userId: string): Promise<IApiServiceResponse<IArticle[]>>
  {
    return this.send("GET", `users/${userId}/articles/recent?expand[]=author&expand[]=author.user&expand[]=author.publisher`);
  }

  public async listCommentsForArticle(id: string, parent: string | null): Promise<IApiServiceResponse<IComment[]>>
  {
    return this.send("GET", `articles/${id}/comments?${parent !== null ? `parent=${parent}&` : ""}expand[]=user`);
  }

  public async createComment(articleId: string, data: {
    content: string,
    parent: string | null,
  }): Promise<IApiServiceResponse<IComment>>
  {
    return this.send("POST", `articles/${articleId}/comments?expand[]=user`, data);
  }

  public async updateArticle(articleId: string, data: {
    title: string,
    content: string,
  }): Promise<IApiServiceResponse<IArticle>>
  {
    return this.send("PATCH", `articles/${articleId}?expand[]=author&expand[]=author.user&expand[]=author.publisher`, data);
  }

  public async deleteArticle(articleId: string): Promise<IApiServiceResponse<IArticle>>
  {
    return this.send("DELETE", `articles/${articleId}`);
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
  }): Promise<IApiServiceResponse<IArticle>>
  {
    return this.send("POST", `authors/${authorId}/articles`, data);
  }

  public async deleteAuthor(authorId: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `authors/${authorId}`);
  }

  public async retrieveBundle(id: string): Promise<IApiServiceResponse<IBundle>>
  {
    return this.send("GET", `bundles/${id}`);
  }

  public async listPublishersForBundle(id: string): Promise<IApiServiceResponse<IPublisher[]>>
  {
    return this.send("GET", `bundles/${id}/publishers`);
  }

  public async listPricesForBundle(id: string, options?: {
    active: boolean,
  }): Promise<IApiServiceResponse<IPrice[]>>
  {
    return this.send("GET", `bundles/${id}/prices${(options && "active" in options) ? `?active=${options.active}` : ""}`);
  }

  public async createPrice(bundleId: string, data: {
    amount: number,
    currency: string,
  }): Promise<IApiServiceResponse<IPrice>>
  {
    return this.send("POST", `bundles/${bundleId}/prices`, data);
  }

  public async addPublisherToBundle(bundleId: string, publisherId: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("POST", `bundles/${bundleId}/publishers/${publisherId}`);
  }

  public async updateBundle(id: string, data: {
    name?: string,
    active?: boolean,
  }): Promise<IApiServiceResponse<IBundle>>
  {
    return this.send("PATCH", `bundles/${id}`, data);
  }

  public async removePublisherFromBundle(bundleId: string, publisherId: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `bundles/${bundleId}/publishers/${publisherId}`);
  }

  public async retrieveOrganization(id: string): Promise<IApiServiceResponse<IOrganization>>
  {
    return this.send("GET", `organizations/${id}`);
  }

  public async listBundlesForOrganization(organizationId: string): Promise<IApiServiceResponse<IBundle[]>>
  {
    return this.send("GET", `organizations/${organizationId}/bundles`);
  }

  public async listPublishersForOrganization(organizationId: string, options?: { not_in_bundle?: string }): Promise<IApiServiceResponse<IPublisher[]>>
  {
    return this.send("GET", `organizations/${organizationId}/publishers${
      options?.not_in_bundle
        ? `?not_in_bundle=${options.not_in_bundle}`
        : ""
    }`);
  }

  public async connectAccount(organizationId: string): Promise<IApiServiceResponse<{ url: string }>>
  {
    return this.send("GET", `organizations/${organizationId}/stripe/connect`);
  }

  public async createSignInLinkForStripeDashboard(organizationId: string): Promise<IApiServiceResponse<{ url: string }>>
  {
    return this.send("GET", `organizations/${organizationId}/stripe/dashboard`);
  }

  public async createOrganization(data: {
    name: string,
  }): Promise<IApiServiceResponse<IOrganization>>
  {
    return this.send("POST", "organizations", data);
  }

  public async createBundle(organizationId: string, data: {
    name: string,
  }): Promise<IApiServiceResponse<IBundle>>
  {
    return this.send("POST", `organizations/${organizationId}/bundles`, data);
  }

  public async createPublisher(organizationId: string, data: {
    name: string,
    url: string,
  }): Promise<IApiServiceResponse<IPublisher>>
  {
    return this.send("POST", `organizations/${organizationId}/publishers`, data);
  }

  public async updateOrganization(id: string, data: {
    name?: string,
  }): Promise<IApiServiceResponse<IOrganization>>
  {
    return this.send("PATCH", `organizations/${id}`, data);
  }

  public async deleteOrganization(id: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `organizations/${id}`);
  }

  public async deletePaymentMethod(id: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `payment-methods/${id}`);
  }

  public async updatePrice(id: string, data: {
    active?: boolean,
  }): Promise<IApiServiceResponse<IPrice>>
  {
    return this.send("PATCH", `prices/${id}`, data);
  }

  public async retrievePublisher(id: string): Promise<IApiServiceResponse<IPublisher>>
  {
    return this.send("GET", `publishers/${id}`);
  }

  public async retrievePublisherVerificationData(publisherId: string): Promise<IApiServiceResponse<{ dns: { record: string } }>>
  {
    return this.send("GET", `publishers/${publisherId}/verification/data`);
  }

  public async listAuthorsForPublisher(publisherId: string): Promise<IApiServiceResponse<IAuthor[]>>
  {
    return this.send("GET", `publishers/${publisherId}/authors?expand[]=user`);
  }

  public async listArticlesForPublisher(publisherId: string): Promise<IApiServiceResponse<IArticle[]>>
  {
    return this.send("GET", `publishers/${publisherId}/articles?expand[]=author&expand[]=author.user`);
  }

  public async listBundlesForPublisher(publisherId: string): Promise<IApiServiceResponse<IBundle[]>>
  {
    return this.send("GET", `publishers/${publisherId}/bundles`);
  }

  public async inviteAuthor(publisherId: string, data: {
    email: string,
  }): Promise<IApiServiceResponse<IAuthor[]>>
  {
    return this.send("POST", `publishers/${publisherId}/authors`, data);
  }

  public async verifyPublisher(publisherId: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("POST", `publishers/${publisherId}/verify`);
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

  public async deletePublisher(id: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `publishers/${id}`);
  }

  public async search(query: string, page: number): Promise<IApiServiceResponse<IArticle[]>>
  {
    return this.send("GET", `search?query=${encodeURIComponent(query)}&limit=${Config.FEED_PAGE_SIZE}&offset=${page * Config.FEED_PAGE_SIZE}&expand[]=author&expand[]=author.user&expand[]=author.publisher`);
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

  public async subscribeToPrice(userId: string, priceId: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("POST", `users/${userId}/subscriptions`, { price: priceId });
  }

  public async updateUser(id: string, data: {
    full_name?: string,
    username?: string,
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
