import { Component, Input } from '@angular/core';
import { IArticleDraft } from 'src/app/publisher-public-page/services/api/api.service';
import { IArticle } from 'src/app/services/api/api.service';
import { FormatService } from '../../services/format/format.service';

@Component({
  selector: 'shared-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent
{
  @Input()
  public article?: IArticle;

  @Input()
  public draft?: IArticleDraft;

  constructor(public format: FormatService)
  {
    if (this.article && this.draft)
    {
      throw new Error("Cannot set both 'article' and 'draft'");
    }
  }
}
