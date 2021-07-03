import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export type IApiServiceResponse<T> =
{
  status: number,
  success: true,
  data: T,
  errors: undefined,
  /**
   * Body of the request
   */
  raw?: any,
}
|
{
  status: number,
  success: false,
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

    const response = await fetch(`${environment.endpoints.api}/${url}`, {
      method,
      headers,
      body: contentType === "application/json"
        ? JSON.stringify(body)
        : body,
      credentials: "include",
    });

    // HTTP 204 - No Content
    if (response.status === 204)
    {
      return { status: 204, success: true } as IApiServiceResponse<void>;
    }

    const success = response.status >= 200 && response.status < 300;

    const json = await response.json();

    if (success)
    {
      return {
        status: response.status,
        success,
        data: json,
        raw: json,
      } as IApiServiceResponse<any>;
    }

    return {
      status: response.status,
      success,
      errors: json,
      raw: json,
    } as IApiServiceResponse<any>;
  }
}
