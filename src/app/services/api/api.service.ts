import { Injectable } from '@angular/core';
import { FEED_PAGE_SIZE } from 'src/config';
import { environment } from 'src/environments/environment';

interface IApiServiceResponse<T>
{
  status: number,
  data?: T,
  errors?: string[],
}

export interface IUser
{
  id: string,
  first_name: string,
  last_name: string,
  email: string,
  has_default_payment_method: boolean,
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
  content: string,
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
  value: number,
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

@Injectable({
  providedIn: 'root'
})
export class ApiService
{
  constructor()
  {}

  private async send(method: "DELETE" | "GET" | "PATCH" | "POST" | "PUT", url: string, body?: any): Promise<IApiServiceResponse<any>>
  {
    const response = await fetch(`${environment.api.endpoint}/${url}`, {
      method,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("session.id")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result: IApiServiceResponse<any> = { status: response.status };

    // No Content
    if (result.status === 204)
    {
      return result;
    }

    const json = await response.json();

    if (response.status !== 200)
    {
      result.errors = (json.message as string).split(". ");
    }
    else
    {
      result.data = json;
    }

    return result;
  }

  public async retrieveArticle(id: string): Promise<IApiServiceResponse<IArticle>>
  {
    return this.send("GET", `articles/${id}?expand[]=author&expand[]=author.user&expand[]=author.publisher&format=html`);
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
    return this.send("PATCH", `articles/${articleId}?expand[]=author&expand[]=author.user&expand[]=author.publisher&format=html`, data);
  }

  public async deleteArticle(articleId: string): Promise<IApiServiceResponse<IArticle>>
  {
    return this.send("DELETE", `articles/${articleId}`);
  }

  public async createArticle(authorId: string, data: {
    title: string,
    content: string,
  }): Promise<IApiServiceResponse<IArticle>>
  {
    return this.send("POST", `authors/${authorId}/articles`, data);
  }

  public async retrieveBundle(id: string): Promise<IApiServiceResponse<IBundle>>
  {
    return this.send("GET", `bundles/${id}`);
  }

  public async listPublishersForBundle(id: string): Promise<IApiServiceResponse<IPublisher[]>>
  {
    return this.send("GET", `bundles/${id}/publishers`);
  }

  public async listPricesForBundle(id: string): Promise<IApiServiceResponse<IPrice[]>>
  {
    return this.send("GET", `bundles/${id}/prices`);
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

  public async deletePrice(id: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `prices/${id}`);
  }

  public async retrievePublisher(id: string): Promise<IApiServiceResponse<IPublisher>>
  {
    return this.send("GET", `publishers/${id}`);
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

  public async updatePublisher(id: string, data: {
    name?: string,
    url?: string,
  }): Promise<IApiServiceResponse<IPublisher>>
  {
    return this.send("PATCH", `publishers/${id}`, data);
  }

  public async deletePublisher(id: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `publishers/${id}`);
  }

  public async search(query: string, page: number): Promise<IApiServiceResponse<IArticle[]>>
  {
    return this.send("GET", `search?query=${query}&limit=${FEED_PAGE_SIZE}&offset=${page * FEED_PAGE_SIZE}&expand[]=author&expand[]=author.user&expand[]=author.publisher`);
  }

  public async retrieveSession(id: string): Promise<IApiServiceResponse<ISession>>
  {
    return this.send("GET", `sessions/${id}`);
  }

  public async createSession(email: string, password: string): Promise<IApiServiceResponse<ISession>>
  {
    return this.send("POST", "sessions", { email, password });
  }

  public async deleteSession(id: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `sessions/${id}`);
  }

  public async retrieveUser(id: string): Promise<IApiServiceResponse<IUser>>
  {
    return this.send("GET", `users/${id}`);
  }

  public async retrieveUserFeed(userId: string, page: number): Promise<IApiServiceResponse<IArticle[]>>
  {
    return this.send("GET", `users/${userId}/feed?expand[]=author&expand[]=author.user&expand[]=author.publisher&limit=${FEED_PAGE_SIZE}&offset=${page * FEED_PAGE_SIZE}`);
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

  public async createBillingPortalSession(userId: string): Promise<IApiServiceResponse<{ url: string }>>
  {
    return this.send("GET", `users/${userId}/stripe/portal`);
  }

  public async listSubscriptionsForUser(userId: string): Promise<IApiServiceResponse<ISubscription[]>>
  {
    return this.send("GET", `users/${userId}/subscriptions?expand[]=bundle`);
  }

  public async createUser(data: {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
  }): Promise<IApiServiceResponse<IUser>>
  {
    return this.send("POST", "users", data);
  }

  public async addPaymentMethodToUser(userId: string, data: {
    id: string,
  }): Promise<IApiServiceResponse<void>>
  {
    return this.send("POST", `users/${userId}/payment-methods`, data);
  }

  public async subscribeToBundle(userId: string, bundleId: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("POST", `users/${userId}/subscriptions`, { bundle: bundleId });
  }

  public async updateUser(id: string, data: {
    first_name?: string,
    last_name?: string,
    email?: string,
    old_password?: string,
    new_password?: string,
  }): Promise<IApiServiceResponse<IUser>>
  {
    return this.send("PATCH", `users/${id}`, data);
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
