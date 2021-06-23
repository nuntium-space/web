import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';
import { FormatService } from '../shared/services/format/format.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit
{
  public isDraft = false;

  constructor(public auth: AuthService, public format: FormatService, public route: ActivatedRoute)
  {}

  public ngOnInit()
  {
    this.route.params.subscribe({
      next: (params) =>
      {
        this.isDraft = params.id.startsWith("dft_");
      },
    });
  }
}
