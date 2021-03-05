import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IOrganization } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class PublishersComponent
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
