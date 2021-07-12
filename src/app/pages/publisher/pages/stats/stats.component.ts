import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';
import { IPublisher } from 'src/app/services/api/api.service';
import { UserSettingsService } from 'src/app/shared/services/user-settings/user-settings.service';
import {
  ApiService,
  IViewTimeSeriesEntry,
} from '../../services/api/api.service';

@Component({
  selector: 'publisher-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements AfterViewInit, OnChanges {
  @Input()
  public publisher?: IPublisher;

  @ViewChild('canvas')
  public canvas?: ElementRef<HTMLCanvasElement>;

  @ViewChild('precision')
  public precision?: ElementRef<HTMLSelectElement>;

  @ViewChild('timeSpan')
  public timeSpan?: ElementRef<HTMLSelectElement>;

  private chart?: Chart<'line', { x: string; y: number }[], string>;

  private viewsTimeSeries?: IViewTimeSeriesEntry[];

  constructor(
    private api: ApiService,
    private translate: TranslateService,
    private userSettings: UserSettingsService
  ) {}

  public ngAfterViewInit() {
    const ctx = this.canvas?.nativeElement.getContext('2d');

    if (!ctx) {
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      options: {
        locale: this.userSettings.userSettings?.language ?? undefined,
        color: '#fff',
        backgroundColor: '#fff',
        borderColor: '#fff',
        scales: {
          x: {
            type: 'time',
            time: {
              // Luxon format string
              tooltipFormat: 'DD',
              unit: 'day',
            },
            ticks: {
              color: '#fff',
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: '#fff',
            },
          },
        },
      },
      data: {
        datasets: [],
      },
    });
  }

  public ngOnChanges() {
    if (!this.publisher) {
      return;
    }

    const timeSpan = this.timeSpan?.nativeElement.selectedOptions[0].value as "month" | "week" | undefined ?? "month";

    const dateOffset = timeSpan === "month"
      ? 60 * 60 * 24 * 30
      : 60 * 60 * 24 * 7;

    const from = new Date();
    from.setSeconds(from.getSeconds() - dateOffset);

    const to = new Date();

    const precision = this.precision?.nativeElement.selectedOptions[0].value as "hour" | "day" | undefined ?? "day";

    this.api
      .retrieveViewsTimeSeriesData(this.publisher, { from, to, precision })
      .then((response) => {
        if (response.success && this.chart) {
          this.viewsTimeSeries = response.data;

          this.chart.data = {
            labels: this.viewsTimeSeries.map((_) => _.segment.split('T')[0]),
            datasets: [
              {
                label: this.translate.instant("publisher.stats.views.__title"),
                data: this.viewsTimeSeries.map((_) => ({
                  x: _.segment.split('T')[0],
                  y: _.count,
                })),
                borderWidth: 1,
                borderColor: '#ffffff',
              },
            ],
          };

          this.chart.update();
        }
      });
  }
}
