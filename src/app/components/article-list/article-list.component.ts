import { Component, Input } from '@angular/core';
import { IArticle } from 'src/app/services/api/api.service';
import { FormatService } from 'src/app/services/format/format.service';

@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent
{
  @Input("articles")
  public articles?: IArticle[];

  constructor(public format: FormatService)
  {}
}
