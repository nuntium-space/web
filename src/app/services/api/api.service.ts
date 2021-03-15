import { Injectable } from '@angular/core';

interface IApiServiceResponse<T>
{
  data?: T;
  errors?: string[];
}

export interface IUser
{
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface IOrganization
{
  id: string;
  name: string;
  owner: IUser;
}

export interface IPublisher
{
  id: string;
  name: string;
  url: string;
  organization: IOrganization;
}

export interface IAuthor
{
  id: string;
  user: IUser;
  publisher: IPublisher;
}

export interface IArticle
{
  id: string;
  title: string;
  content: string;
  reading_time: number;
  author: IAuthor;
  created_at: string;
  updated_at: string;
}

export interface IComment
{
  id: string;
  content: string;
  user: IUser;
  article: IArticle;
  parent: IComment | null;
  reply_count: number;
  created_at: string;
  updated_at: string;
}

export interface ISession
{
  id: string;
  user: IUser;
  expires_at: string;
}

export interface IBundle
{
  id: string;
  name: string;
  price: number;
  organization: IOrganization;
}

export interface ISubscription
{
  user: IUser;
  bundle: IBundle;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService
{
  private readonly ENDPOINT = "http://localhost:4000";

  constructor()
  {}

  private async send(method: "DELETE" | "GET" | "PATCH" | "POST", url: string, body?: any): Promise<any>
  {
    const response = await fetch(`${this.ENDPOINT}/${url}`, {
      method,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("session.id")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // No Content
    if (response.status === 204)
    {
      return;
    }

    const result: IApiServiceResponse<any> = {};

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
    return this.send("GET", `articles/${id}?expand[]=author&expand[]=author.user&expand[]=author.publisher`);
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

  public async retrieveBundle(id: string): Promise<IApiServiceResponse<IBundle>>
  {
    return this.send("GET", `bundles/${id}`);
  }

  public async listPublishersForBundle(id: string): Promise<IApiServiceResponse<IPublisher[]>>
  {
    return this.send("GET", `bundles/${id}/publishers`);
  }

  public async createCheckoutSessionForBundle(id: string): Promise<IApiServiceResponse<{ id: string }>>
  {
    return this.send("GET", `bundles/${id}/stripe/checkout`);
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

  public async createOrganization(data: {
    name: string,
  }): Promise<IApiServiceResponse<IOrganization>>
  {
    return this.send("POST", "organizations", data);
  }

  public async createBundle(organizationId: string, data: {
    name: string,
    price: number,
  }): Promise<IApiServiceResponse<IBundle>>
  {
    return this.send("POST", `organizations/${organizationId}/bundles`, data);
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

  public async createPublisher(data: {
    name: string,
    url: string,
    organization: string,
  }): Promise<IApiServiceResponse<IPublisher>>
  {
    return this.send("POST", "publishers", data);
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

  public async listOrganizationsForUser(userId: string): Promise<IApiServiceResponse<IOrganization[]>>
  {
    return this.send("GET", `users/${userId}/organizations`);
  }

  public async listPublishersForUser(userId: string): Promise<IApiServiceResponse<IPublisher[]>>
  {
    return this.send("GET", `users/${userId}/publishers`);
  }

  public async createBillingPortalSession(userId: string): Promise<IApiServiceResponse<{ url: string }>>
  {
    return this.send("GET", `users/${userId}/stripe/portal`);
  }

  public async listSubscriptionsForUser(userId: string): Promise<IApiServiceResponse<ISubscription[]>>
  {
    return this.send("GET", `users/${userId}/subscriptions`);
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

  public async deleteUser(id: string): Promise<IApiServiceResponse<void>>
  {
    return this.send("DELETE", `users/${id}`);
  }
}
