import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPublisher } from 'src/app/services/api/api.service';

@Component({
  selector: 'bundle-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class BundlePublishersComponent
{
  public publishers?: IPublisher[];

  constructor(api: ApiService, route: ActivatedRoute)
  {
    route.params.subscribe({
      next: params =>
      {
        api.listPublishersForBundle(params.id).then(response =>
        {
          this.publishers = response.data;
        });
      },
    });
  }
}
