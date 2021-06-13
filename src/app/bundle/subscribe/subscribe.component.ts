import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, IBundle, IPrice } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormatService } from 'src/app/shared/services/format/format.service';

@Component({
  selector: 'bundle-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnChanges
{
  @Input()
  public bundle?: IBundle;

  public prices?: IPrice[];

  public subscribeForm = new FormGroup({
    price: new FormControl(),
  });

  constructor(public auth: AuthService, public format: FormatService, private api: ApiService, private router: Router)
  {}

  public async ngOnChanges(): Promise<void>
  {
    if (!this.bundle)
    {
      return;
    }

    this.api
      .listPricesForBundle(this.bundle.id, { active: true })
      .then(response =>
      {
        this.prices = response.data;
      });
  }

  public async subscribe(end: () => void)
  {
    if (!this.auth.user)
    {
      return;
    }

    const response = await this.api.subscribeToPrice(
      this.auth.user.id,
      this.subscribeForm.get("price")?.value ?? "",
    );

    end();

    if (!response.errors)
    {
      this.router.navigateByUrl("/");
    }
  }
}
