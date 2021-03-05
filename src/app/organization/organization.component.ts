import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IOrganization } from '../services/api/api.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent
{
  public organization?: IOrganization;

  constructor(api: ApiService, route: ActivatedRoute)
  {
    api.retrieveOrganization(route.snapshot.params.id).then(response =>
    {
      this.organization = response.data;
    });
  }
}
