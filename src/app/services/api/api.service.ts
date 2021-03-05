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

export interface ISession
{
  id: string;
  user: IUser;
  expires_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly ENDPOINT = "http://localhost:4000";

  constructor() { }

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

  public async retrieveUser(id: string): Promise<IApiServiceResponse<IUser>>
  {
    return this.send("GET", `users/${id}`);
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

  public async retrieveOrganization(id: string): Promise<IApiServiceResponse<IOrganization>>
  {
    return this.send("GET", `organizations/${id}`);
  }

  public async createOrganization(data: {
    name: string,
  }): Promise<IApiServiceResponse<IOrganization>>
  {
    return this.send("POST", "organizations", data);
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
}
