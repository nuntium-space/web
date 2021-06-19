import { Component, Input } from '@angular/core';
import { IArticle } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'article-bottom-actions',
  templateUrl: './bottom-actions.component.html',
  styleUrls: ['./bottom-actions.component.scss']
})
export class BottomActionsComponent
{
  @Input()
  public article?: IArticle;

  constructor(private api: ApiService, private auth: AuthService)
  {}

  public async bookmark()
  {
    if (!this.article || !this.article.__metadata || !this.auth.user)
    {
      return;
    }

    const { success } = this.article.__metadata.is_bookmarked
      ? await this.api.deleteBookmark(this.auth.user, this.article)
      : await this.api.createBookmark(this.auth.user, this.article);

    if (success)
    {
      this.article.__metadata.is_bookmarked = !this.article.__metadata?.is_bookmarked;
    }
  }
}
