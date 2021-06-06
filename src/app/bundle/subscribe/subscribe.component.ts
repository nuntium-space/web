import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, IBundle, IPrice } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormatService } from 'src/app/shared/services/format/format.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit
{
  public bundle?: IBundle;

  public prices?: IPrice[];

  public subscribeForm = new FormGroup({
    price: new FormControl(),
  });

  constructor(public auth: AuthService, public format: FormatService, private api: ApiService, private router: Router, private route: ActivatedRoute)
  {}

  public async ngOnInit(): Promise<void>
  {
    this.route.params.subscribe({
      next: params =>
      {
        this.api.retrieveBundle(params.id).then(response =>
        {
          this.bundle = response.data;
        });

        this.api.listPricesForBundle(params.id, { active: true }).then(response =>
        {
          this.prices = response.data;
        });
      },
    });
  }

  public async subscribe(e: Event)
  {
    e.preventDefault();

    if (!this.auth.user)
    {
      return;
    }

    const response = await this.api.subscribeToPrice(
      this.auth.user.id,
      this.subscribeForm.get("price")?.value ?? "",
    );

    if (!response.errors)
    {
      this.router.navigateByUrl("/");
    }
  }
}
