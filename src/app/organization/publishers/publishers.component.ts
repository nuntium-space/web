import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IOrganization, IPublisher } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class PublishersComponent
{
  public organization?: IOrganization;

  public publishers?: IPublisher[];

  constructor(api: ApiService, route: ActivatedRoute)
  {
    const organizationId = route.snapshot.params.id;

    api.retrieveOrganization(organizationId).then(response =>
    {
      this.organization = response.data;
    });

    api.listPublishers(organizationId).then(response =>
    {
      this.publishers = response.data;
    });
  }
}
