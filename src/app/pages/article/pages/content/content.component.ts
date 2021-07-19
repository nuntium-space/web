import { Component, Input, OnChanges } from '@angular/core';
import { IArticle } from 'src/app/services/api/api.service';
import { ApiService, IArticleSource } from '../../services/api/api.service';

@Component({
  selector: 'article-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnChanges {
  @Input()
  public article?: IArticle;

  @Input()
  public isSubscribed?: boolean;

  public sources?: IArticleSource[];

  constructor(private api: ApiService) {}

  ngOnChanges(): void {
    if (!this.article) {
      return;
    }

    this.api.retrieveSources(this.article.id).then((response) => {
      if (response.data) {
        this.sources = response.data;
      }
    });
  }
}
