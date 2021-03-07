import { Component, Input } from '@angular/core';
import { IArticle } from 'src/app/services/api/api.service';

@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent
{
  @Input("articles")
  public articles?: IArticle[];

  constructor()
  {}
}
