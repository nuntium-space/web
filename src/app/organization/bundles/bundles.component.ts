import { Component, Input, OnChanges } from '@angular/core';
import { ApiService, IBundle, IOrganization } from 'src/app/services/api/api.service';

@Component({
  selector: 'organization-bundles',
  templateUrl: './bundles.component.html',
  styleUrls: ['./bundles.component.scss']
})
export class OrganizationBundlesComponent implements OnChanges
{
  @Input()
  public organization?: IOrganization;

  public bundles?: IBundle[];

  constructor(private api: ApiService)
  {}

  public ngOnChanges()
  {
    if (!this.organization)
    {
      return;
    }

    this.api
      .listBundlesForOrganization(this.organization.id)
      .then(response =>
      {
        this.bundles = response.data;
      });
  }
}
