import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';
import {
  CoreApiService,
  IApiServiceResponse,
} from 'src/app/core/services/api/api.service';
import { IViewTimeSeriesEntry } from 'src/app/pages/publisher/services/api/api.service';
import { UserSettingsService } from '../../services/user-settings/user-settings.service';

@Component({
  selector: 'shared-stats-chart',
  templateUrl: './stats-chart.component.html',
  styleUrls: ['./stats-chart.component.scss'],
})
export class StatsChartComponent {
  @Input()
  public endpoint?: string;

  @ViewChild('canvas')
  public canvas?: ElementRef<HTMLCanvasElement>;

  @ViewChild('precision')
  public precision?: ElementRef<HTMLSelectElement>;

  @ViewChild('timeSpan')
  public timeSpan?: ElementRef<HTMLSelectElement>;

  private chart?: Chart<'line', { x: string; y: number }[], string>;

  private viewsTimeSeries?: IViewTimeSeriesEntry[];

  constructor(
    private api: CoreApiService,
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
              unit: 'day',
              tooltipFormat: 'DD',
              displayFormats: {
                day: 'DD',
                hour: 'DD T',
              },
            },
            ticks: {
              color: '#fff',
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: '#fff',
              stepSize: 1,
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
    if (!this.endpoint) {
      return;
    }

    const timeSpan =
      (this.timeSpan?.nativeElement.selectedOptions[0].value as
        | 'month'
        | 'week'
        | undefined) ?? 'month';

    const dateOffset =
      timeSpan === 'month' ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7;

    const from = new Date();
    from.setSeconds(from.getSeconds() - dateOffset);

    const to = new Date();

    const precision =
      (this.precision?.nativeElement.selectedOptions[0].value as
        | 'hour'
        | 'day'
        | undefined) ?? 'day';

    (this.api
      .send("GET", `${this.endpoint}?from=${from.toISOString()}&to=${to.toISOString()}&precision=${precision}`) as Promise<IApiServiceResponse<IViewTimeSeriesEntry[]>>)
      .then((response) => {
        if (response.success && this.chart) {
          this.viewsTimeSeries = response.data;

          (this.chart.options.scales?.x as any).time.unit = precision;
          (this.chart.options.scales?.x as any).time.tooltipFormat =
            precision === 'day' ? 'DD' : 'DD T';

          this.chart.data = {
            labels: this.viewsTimeSeries.map((_) => _.segment),
            datasets: [
              {
                label: this.translate.instant('publisher.stats.views.__title'),
                data: this.viewsTimeSeries.map((_) => ({
                  x: _.segment,
                  y: _.count,
                })),
                borderWidth: 1,
                borderColor: '#fff',
              },
            ],
          };

        this.chart.update();
      }
    });
  }
}
