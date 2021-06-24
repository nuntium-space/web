import { Component, Input, OnChanges } from '@angular/core';
import { IBundle, IPublisher } from 'src/app/services/api/api.service';
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'bundle-publishers-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddPublisherComponent implements OnChanges
{
  @Input()
  public bundle?: IBundle;

  public publishers?: IPublisher[];

  constructor(private api: ApiService)
  {}

  public ngOnChanges()
  {
    if (!this.bundle)
    {
      return;
    }

    this.api
      .listPublishersForOrganization(this.bundle.organization.id, { not_in_bundle: this.bundle.id })
      .then(response =>
      {
        this.publishers = response.data;
      })
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
