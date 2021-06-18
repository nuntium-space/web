import { Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root'
})
export class CoreApiService
{
  public async send(
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
}
