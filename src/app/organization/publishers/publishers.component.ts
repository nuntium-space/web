import { Component, Input, OnChanges } from '@angular/core';
import { ApiService, IOrganization, IPublisher } from 'src/app/services/api/api.service';

@Component({
  selector: 'organization-publishers',
  templateUrl: './publishers.component.html',
  styleUrls: ['./publishers.component.scss']
})
export class PublishersComponent implements OnChanges
{
  @Input()
  public organization?: IOrganization;

  public publishers?: IPublisher[];

  constructor(private api: ApiService)
  {}

  public ngOnChanges()
  {
    if (!this.organization)
    {
      return;
    }

    this.api
      .listPublishersForOrganization(this.organization.id)
      .then(response =>
      {
        this.publishers = response.data;
      });
  }

  public async deletePublisher(publisher: IPublisher)
  {
    if (!this.publishers)
    {
      return;
    }

    await this.api.deletePublisher(publisher.id);

    this.publishers = this.publishers.filter(_ => _.id !== publisher.id);
  }
}
