import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IBundle } from 'src/app/services/api/api.service';

@Component({
  selector: 'organization-bundles',
  templateUrl: './bundles.component.html',
  styleUrls: ['./bundles.component.scss']
})
export class OrganizationBundlesComponent
{
  public bundles?: IBundle[];

  constructor(api: ApiService, route: ActivatedRoute)
  {
    route.params.subscribe({
      next: params =>
      {
        api.listBundlesForOrganization(params.id).then(response =>
        {
          this.bundles = response.data;
        });
      },
    });
  }
}
