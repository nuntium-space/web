import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'add-price',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddPriceComponent
{
  private bundleId?: string;

  public form = new FormGroup({
    amount: new FormControl(),
    currency: new FormControl(),
  });

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute)
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

    const response = await this.api.createPrice(this.bundleId, {
      amount: this.form.get("amount")?.value ?? "",
      currency: this.form.get("currency")?.value ?? "",
    });

    this.form.get("amount")?.setErrors({
      errors: response.errors?.filter(e => e.startsWith(`"amount"`))
    });

    this.form.get("currency")?.setErrors({
      errors: response.errors?.filter(e => e.startsWith(`"currency"`))
    });

    if (response.data)
    {
      this.router.navigate([ ".." ], {
        relativeTo: this.route,
      });
    }
  }
}
