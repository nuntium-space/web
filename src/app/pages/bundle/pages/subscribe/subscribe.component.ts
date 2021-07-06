import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IBundle, IPrice, IPublisher } from 'src/app/services/api/api.service';
import { ConfirmEventCallback } from 'src/app/shared/components/async-button/async-button.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormatService } from 'src/app/shared/services/format/format.service';
import { environment } from 'src/environments/environment';
import { Utilities } from 'src/utilities/Utilities';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'bundle-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent implements OnChanges {
  @Input()
  public bundle?: IBundle;

  public publishers?: IPublisher[];
  public prices?: IPrice[];

  public subscribeForm = new FormGroup({
    price: new FormControl(),
  });

  constructor(
    public auth: AuthService,
    public format: FormatService,
    private api: ApiService,
    @Inject(DOCUMENT) private document: Document,
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
        this.prices = response.data;
      });
  }

  public async subscribe([success, failure]: ConfirmEventCallback) {
    const price = Utilities.getFormControlValue(this.subscribeForm.get('price'));

    if (!price) {
      // TODO: Show error (must select one price)
      failure();

      return;
    }

    this.document.location.href = `${environment.endpoints.api}/prices/${price}/checkout`;
  }
}
