import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IBundle, IPublisher } from 'src/app/services/api/api.service';

@Component({
  selector: 'add-publisher',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddPublisherComponent
{
  public bundle?: IBundle;

  public publishers?: IPublisher[];

  constructor(private api: ApiService, route: ActivatedRoute)
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

            this.bundle = bundle;

            return api.listPublishersForOrganization(bundle.organization.id, { not_in_bundle: bundle.id });
          })
          .then(response =>
          {
            this.publishers = response?.data;
          });
      },
    });
  }

  public async addPublisher(publisher: IPublisher)
  {
    if (!this.bundle || !this.publishers)
    {
      return;
    }

    await this.api.addPublisherToBundle(this.bundle.id, publisher.id);

    this.publishers = this.publishers.filter(p => p.id !== publisher.id);
  }
}
