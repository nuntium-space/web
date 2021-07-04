import { Component, Input } from '@angular/core';
import { IArticle } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'article-bottom-actions',
  templateUrl: './bottom-actions.component.html',
  styleUrls: ['./bottom-actions.component.scss'],
})
export class BottomActionsComponent {
  @Input()
  public article?: IArticle;

  public isLoadingLike = false;
  public isLoadingBookmark = false;

  constructor(private api: ApiService, private auth: AuthService) {}

  public share() {
    if (!this.article) {
      return;
    }

    if ('share' in navigator) {
      navigator.share({
        title: this.article.title,
        url: `${environment.endpoints.share}/${this.article.id}`,
      });

      return;
    }

    // TODO
  }

  public async like() {
    if (!this.article || !this.article.__metadata || !this.auth.user) {
      return;
    }

    this.isLoadingLike = true;

    const { success } = this.article.__metadata.is_liked
      ? await this.api.removeLike(this.auth.user, this.article)
      : await this.api.addLike(this.auth.user, this.article);

    this.isLoadingLike = false;

    if (success) {
      this.article.__metadata.is_liked = !this.article.__metadata?.is_liked;
    }
  }

  public async bookmark() {
    if (!this.article || !this.article.__metadata || !this.auth.user) {
      return;
    }

    this.isLoadingBookmark = true;

    const { success } = this.article.__metadata.is_bookmarked
      ? await this.api.deleteBookmark(this.auth.user, this.article)
      : await this.api.createBookmark(this.auth.user, this.article);

    this.isLoadingBookmark = false;

    if (success) {
      this.article.__metadata.is_bookmarked =
        !this.article.__metadata?.is_bookmarked;
    }
  }
}
