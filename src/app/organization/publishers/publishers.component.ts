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
  public publishers?: IPublisher[];

  constructor(api: ApiService, route: ActivatedRoute)
  {
    api.listPublishers(route.snapshot.params.id).then(response =>
    {
      this.publishers = response.data;
    });
  }
}
