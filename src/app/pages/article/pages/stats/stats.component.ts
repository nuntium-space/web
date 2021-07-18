import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'article-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  public articleId?: string;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit() {
    this.route.params.subscribe({
      next: ({ id }) => {
        this.articleId = id;
      },
    });
  }
}
