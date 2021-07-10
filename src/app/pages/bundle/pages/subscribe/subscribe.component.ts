import { Component, Input, OnChanges } from '@angular/core';
import { IBundle, IPrice, IPublisher } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormatService } from 'src/app/shared/services/format/format.service';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'bundle-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent implements OnChanges {
  @Input()
  public bundle?: IBundle;

  public env = environment;

  public publishers?: IPublisher[];
  public prices?: IPrice[];

  public selectedPriceId?: string;

  constructor(
    public auth: AuthService,
    public format: FormatService,
    private api: ApiService
  ) {}

  public async ngOnChanges(): Promise<void> {
    if (!this.bundle) {
      return;
    }

    this.api.listPublishersForBundle(this.bundle.id).then((response) => {
      this.publishers = response.data;
    });

    this.api
      .listPricesForBundle(this.bundle.id, { active: true })
      .then((response) => {
        if (response.success)
        {
          this.prices = response.data;
          this.selectedPriceId = this.prices[0].id;
        }
      });
  }

  public onSelectedPriceChange(e: Event): void {
    const target = e.target as HTMLSelectElement;

    this.selectedPriceId = target.selectedOptions[0].value;
  }
}
