import { Component, Input, OnChanges } from '@angular/core';
import { IPublisher } from 'src/app/services/api/api.service';
import { ApiService, IViewTimeSeriesEntry } from '../../services/api/api.service';

@Component({
  selector: 'publisher-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnChanges {
  @Input()
  public publisher?: IPublisher;

  public viewsTimeSeries?: IViewTimeSeriesEntry[];

  constructor(private api: ApiService) {}

  public ngOnChanges() {
    if (!this.publisher) {
      return;
    }

    this.api
      .retrieveViewsTimeSeriesData(this.publisher, {
        from: new Date(),
        to: new Date(),
      })
      .then(response =>
      {
        this.viewsTimeSeries = response.data;
      });
  }
}
