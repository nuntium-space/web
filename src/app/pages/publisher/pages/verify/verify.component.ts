import { Component, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPublisher } from 'src/app/services/api/api.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'publisher-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyPublisherComponent implements OnChanges
{
  @Input()
  public publisher?: IPublisher;

  public publisherVerificationData?: { dns: { record: string } };

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute)
  {}

  public ngOnChanges()
  {
    if (!this.publisher)
    {
      return;
    }

    this.api
      .retrievePublisherVerificationData(this.publisher.id)
      .then(response =>
      {
        this.publisherVerificationData = response.data;
      });
  }

  public async verify()
  {
    if (!this.publisher)
    {
      return;
    }

    const response = await this.api.verifyPublisher(this.publisher.id);

    if (response.success)
    {
      this.router.navigate([ ".." ], {
        relativeTo: this.route,
      });
    }
  }
}
