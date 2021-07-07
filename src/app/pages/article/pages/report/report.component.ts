import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmEventCallback } from 'src/app/shared/components/async-button/async-button.component';
import { Utilities } from 'src/utilities/Utilities';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'article-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  private articleId?: string;

  public form = new FormGroup({
    reason: new FormControl(),
  });

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.route.params.subscribe({
      next: ({ id }) => {
        this.articleId = id;
      },
    });
  }

  public async onConfirm([
    success,
    failure,
  ]: ConfirmEventCallback): Promise<void> {
    const reason = Utilities.getFormControlValue(this.form.get('reason'));

    if (!this.articleId || !reason) {
      failure();

      return;
    }

    const response = await this.api.sendReport(this.articleId, reason);

    if (!response.success) {
      failure();

      return;
    }

    success();

    this.router.navigate(['..'], {
      relativeTo: this.route,
    });
  }
}
