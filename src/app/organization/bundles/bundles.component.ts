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

  public async archiveBundle(bundle: IBundle)
  {
    if (!this.bundles)
    {
      return;
    }

    const { success } = await this.api.archiveBundle(bundle.id);

    if (success)
    {
      this.bundles = this.bundles.map(_ =>
      {
        if (_.id === bundle.id)
        {
          _.active = false;
        }
    
        return _;
      });
    }
  }
}
