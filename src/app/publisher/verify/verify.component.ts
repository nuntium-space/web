import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, IPublisher } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-verify-publisher',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyPublisherComponent implements OnInit
{
  public publisher?: IPublisher;

  public publisherVerificationData?: { dns: { record: string } };

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute)
  {}

  public ngOnInit()
  {
    this.route.params.subscribe({
      next: params =>
      {
        this.api
          .retrievePublisher(params.id)
          .then(response =>
          {
            this.publisher = response.data;
          });

        this.api
          .retrievePublisherVerificationData(params.id)
          .then(response =>
          {
            this.publisherVerificationData = response.data;
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
      this.router.navigate([ ".." ], {
        relativeTo: this.route,
      });
    }
  }
}
