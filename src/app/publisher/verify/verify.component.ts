import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPublisher } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-verify-publisher',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyPublisherComponent implements OnInit
{
  public publisher?: IPublisher;

  constructor(private api: ApiService, private route: ActivatedRoute)
  {}

  public ngOnInit()
  {
    this.route.params.subscribe({
      next: params =>
      {
        this.api.retrievePublisher(params.id).then(response =>
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
