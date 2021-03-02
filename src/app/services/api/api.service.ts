import { Injectable } from '@angular/core';

interface IApiServiceResponse<T>
{
  data?: T;
  errors?: string[];
}

interface IUser
{
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface ISession
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
        "Authorization": `Bearer ${localStorage.getItem("user.token")}`,
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
      result.errors = [ json.message ];
    }
    else
    {
      result.data = json;
    }

    return result;
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

  public async createSession(email: string, password: string): Promise<IApiServiceResponse<ISession>>
  {
    return this.send("POST", "sessions", { email, password });
  }
}
