import { Component } from '@angular/core';
import { ConfirmEventCallback } from 'src/app/shared/components/async-button/async-button.component';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'article-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent
{
  constructor(private api: ApiService)
  {}

  public async onConfirm([success, failure]: ConfirmEventCallback): Promise<void>
  {
    failure();

    this.api.retrieveSources("asa");
  }
}
