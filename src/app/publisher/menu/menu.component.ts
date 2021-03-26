import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPublisher } from 'src/app/services/api/api.service';

@Component({
  selector: 'publisher-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class PublisherMenuComponent
{
  @Input("section")
  public section?: string;

  public publisher?: IPublisher;

  constructor(private api: ApiService, route: ActivatedRoute)
  {
    route.params.subscribe({
      next: params =>
      {
        api.retrievePublisher(params.id).then(response =>
        {
          this.publisher = response.data;
        });
      },
    });
  }

  public async verify()
  {
    if (!this.publisher)
    {
      return;
    }

    const response = await this.api.verifyPublisher(this.publisher.id);

    if (!response.errors)
    {
      this.publisher.verified = true;
    }
  }
}
