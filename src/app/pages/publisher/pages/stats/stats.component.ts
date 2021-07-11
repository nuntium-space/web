import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';
import { IPublisher } from 'src/app/services/api/api.service';
import { UserSettingsService } from 'src/app/shared/services/user-settings/user-settings.service';
import { ApiService, IViewTimeSeriesEntry } from '../../services/api/api.service';

@Component({
  selector: 'publisher-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements AfterViewInit, OnChanges {
  @Input()
  public publisher?: IPublisher;

  @ViewChild("canvas")
  public canvas?: ElementRef<HTMLCanvasElement>;

  private chart?: Chart<"line", { x: string; y: number; }[], string>;

  private viewsTimeSeries?: IViewTimeSeriesEntry[];

  constructor(private api: ApiService, private userSettings: UserSettingsService) {}

  public ngAfterViewInit()
  {
    const ctx = this.canvas?.nativeElement.getContext("2d");

    if (!ctx)
    {
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      options: {
        locale: this.userSettings.userSettings?.language ?? undefined,
        color: "#ffffff",
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        scales: {
          x: {
            type: 'time',
            time: {
              // Luxon format string
              tooltipFormat: 'DD T',
              unit: "day",
            },
            ticks: {
              color: "#fff",
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: "#fff",
            },
          }
        }
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

    this.api
      .retrieveViewsTimeSeriesData(this.publisher, {
        from: new Date("2021-07-01T00:00:00.000Z"),
        to: new Date("2021-07-11T00:00:00.000Z"),
        precision: "day",
      })
      .then(response =>
      {
        if (response.success && this.chart)
        {
          this.viewsTimeSeries = response.data;

          this.chart.data = {
            labels: this.viewsTimeSeries.map(_ => _.segment.split("T")[0]),
            datasets: [
              {
                label: "Views",
                data: this.viewsTimeSeries.map(_ => ({
                  x: _.segment.split("T")[0],
                  y: _.count,
                })),
                borderWidth: 1,
                borderColor: "#ffffff",
              },
            ],
          };

          this.chart.update();
        }
      });
  }
}
