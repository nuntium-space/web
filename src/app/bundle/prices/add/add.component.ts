import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'add-price',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddPriceComponent
{
  private bundleId?: string;

  constructor(private api: ApiService, route: ActivatedRoute)
  {
    route.params.subscribe({
      next: params =>
      {
        this.bundleId = params.id;
      },
    });
  }

  public async onSubmit(e: Event)
  {
    e.preventDefault();

    if (!this.bundleId)
    {
      return;
    }

    // TODO
  }
}
