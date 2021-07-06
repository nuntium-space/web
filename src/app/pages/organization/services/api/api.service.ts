import { Injectable } from '@angular/core';
import {
  CoreApiService,
  IApiServiceResponse,
} from 'src/app/core/services/api/api.service';
import {
  IBundle,
  IOrganization,
  IPublisher,
} from 'src/app/services/api/api.service';

@Injectable()
export class ApiService extends CoreApiService {
  public async retrieveOrganization(
    id: string
  ): Promise<IApiServiceResponse<IOrganization>> {
    return this.send('GET', `organizations/${id}`);
  }

  public async listBundlesForOrganization(
    organizationId: string
  ): Promise<IApiServiceResponse<IBundle[]>> {
    return this.send('GET', `organizations/${organizationId}/bundles`);
  }

  public async updateBundle(
    id: string,
    data: {
      name?: string;
      active?: boolean;
    }
  ): Promise<IApiServiceResponse<IBundle>> {
    return this.send('PATCH', `bundles/${id}`, data);
  }

  public async createBundle(
    organizationId: string,
    data: {
      name: string;
    }
  ): Promise<IApiServiceResponse<{ id: string }>> {
    return this.send('POST', `organizations/${organizationId}/bundles`, data);
  }

  public async updateOrganization(
    id: string,
    data: {
      name?: string;
    }
  ): Promise<IApiServiceResponse<IOrganization>> {
    return this.send('PATCH', `organizations/${id}`, data);
  }

  public async listPublishersForOrganization(
    organizationId: string,
    options?: { not_in_bundle?: string }
  ): Promise<IApiServiceResponse<IPublisher[]>> {
    return this.send(
      'GET',
      `organizations/${organizationId}/publishers${
        options?.not_in_bundle ? `?not_in_bundle=${options.not_in_bundle}` : ''
      }`
    );
  }

  public async createPublisher(
    organizationId: string,
    data: {
      name: string;
      url: string;
    }
  ): Promise<IApiServiceResponse<{ id: string }>> {
    return this.send(
      'POST',
      `organizations/${organizationId}/publishers`,
      data
    );
  }

  public async deletePublisher(id: string): Promise<IApiServiceResponse<void>> {
    return this.send('DELETE', `publishers/${id}`);
  }
}
