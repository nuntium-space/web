import { Component, Input, OnChanges } from '@angular/core';
import { IBundle, IOrganization } from 'src/app/services/api/api.service';
import { ApiService } from '../../services/api/api.service';

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

  public async archiveOrRestoreBundle(bundle: IBundle)
  {
    if (!this.bundles)
    {
      return;
    }

    const { success } = await this.api.updateBundle(bundle.id, { active: !bundle.active });

    if (success)
    {
      this.bundles = this.bundles.map(_ =>
      {
        if (_.id === bundle.id)
        {
          _.active = !bundle.active;
        }
    
        return _;
      });
    }
  }
}
