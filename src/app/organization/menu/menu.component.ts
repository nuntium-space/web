import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IOrganization } from 'src/app/services/api/api.service';

@Component({
  selector: 'organization-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class OrganizationMenuComponent
{
  @Input("section")
  public section?: string;

  public organization?: IOrganization;

  constructor(api: ApiService, route: ActivatedRoute)
  {
    const organizationId = route.snapshot.params.id;

    api.retrieveOrganization(organizationId).then(response =>
    {
      this.organization = response.data;
    });
  }
}
