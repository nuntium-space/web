import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPublisher } from 'src/app/services/api/api.service';

@Component({
  selector: 'add-publisher',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddPublisherComponent
{
  public publishers?: IPublisher[];

  constructor(api: ApiService, route: ActivatedRoute)
  {
    route.params.subscribe({
      next: params =>
      {
        api
          .retrieveBundle(params.id)
          .then(response => response.data)
          .then(bundle =>
          {
            if (!bundle)
            {
              return;
            }

            return api.listPublishersForOrganization(bundle.organization.id, { not_in_bundle: bundle.id });
          })
          .then(response =>
          {
            this.publishers = response?.data;
          });
      },
    });
  }
}
