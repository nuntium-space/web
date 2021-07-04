import { Component, Input } from '@angular/core';
import { IArticle } from 'src/app/services/api/api.service';

@Component({
  selector: 'shared-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent {
  @Input()
  public articles?: IArticle[];
}
