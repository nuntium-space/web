import { Component, Input, OnInit } from '@angular/core';
import { ApiService, IBundle, IPublisher } from 'src/app/services/api/api.service';

@Component({
  selector: 'bundle-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class BundlePublishersComponent implements OnInit
{
  @Input()
  public bundle?: IBundle;

  public publishers?: IPublisher[];

  constructor(private api: ApiService)
  {}

  public ngOnInit()
  {
    if (!this.bundle)
    {
      return;
    }

    this.api
      .listPublishersForBundle(this.bundle.id)
      .then(response =>
      {
        this.publishers = response.data;
      });
  }

  public async removePublisher(publisher: IPublisher)
  {
    if (!this.bundle || !this.publishers)
    {
      return;
    }

    await this.api.removePublisherFromBundle(this.bundle.id, publisher.id);

    this.publishers = this.publishers.filter(p => p.id !== publisher.id);
  }
}
