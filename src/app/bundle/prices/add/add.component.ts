import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, IBundle } from 'src/app/services/api/api.service';
import { Config } from 'src/config/Config';

@Component({
  selector: 'bundle-prices-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddPriceComponent
{
  @Input()
  public bundle?: IBundle;

  public currencies = Config.CURRENCIES;

  public form = new FormGroup({
    amount: new FormControl(),
    currency: new FormControl(),
  });

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute)
  {}

  public async onSubmit(end: () => void)
  {
    if (!this.bundle)
    {
      return;
    }

    let amount: number = this.form.get("amount")?.value ?? -1;
    const currency = this.form.get("currency")?.value ?? "";

    if ([ "usd", "eur" ].includes(currency))
    {
      amount *= 100;
    }

    const response = await this.api.createPrice(this.bundle.id, {
      amount: Math.trunc(amount),
      currency,
    });

    end();

    this.form.get("amount")?.setErrors({
      errors: response.errors?.filter(e => e.field === "amount")
    });

    this.form.get("currency")?.setErrors({
      errors: response.errors?.filter(e => e.field === "currency")
    });

    if (response.data)
    {
      this.router.navigate([ ".." ], {
        relativeTo: this.route,
      });
    }
  }
}
