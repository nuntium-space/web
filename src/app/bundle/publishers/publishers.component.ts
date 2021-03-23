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
  public bundleId?: string;

  public publishers?: IPublisher[];

  constructor(private api: ApiService, route: ActivatedRoute)
  {
    route.params.subscribe({
      next: params =>
      {
        this.bundleId = params.id;

        api.listPublishersForBundle(params.id).then(response =>
        {
          this.publishers = response.data;
        });
      },
    });
  }

  public async removePublisher(publisher: IPublisher)
  {
    if (!this.bundleId || !this.publishers)
    {
      return;
    }

    await this.api.removePublisherFromBundle(this.bundleId, publisher.id);

    this.publishers = this.publishers.filter(p => p.id !== publisher.id);
  }
}
