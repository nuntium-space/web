import { Component, Input } from '@angular/core';
import { IArticle } from 'src/app/services/api/api.service';
import { FormatService } from '../../services/format/format.service';

@Component({
  selector: 'shared-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent
{
  @Input("article")
  public article?: IArticle;

  constructor(public format: FormatService)
  {}
}
