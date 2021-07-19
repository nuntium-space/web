import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IArticle } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormatService } from 'src/app/shared/services/format/format.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'article-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input()
  public article?: IArticle;

  @Input()
  public section?: string;

  constructor(public auth: AuthService, public format: FormatService, private api: ApiService, private router: Router)
  {}

  public async createUpdateDraft() {
    if (!this.article) {
      return;
    }

    const response = await this.api.createDraftFromArticle(this.article);

    if (response.success) {
      this.router.navigateByUrl(`/draft/${response.data.id}`);
    }
  }

  public async deleteArticle() {
    if (!this.article) {
      return;
    }

    const response = await this.api.deleteArticle(this.article.id);

    if (response.success) {
      this.router.navigateByUrl(`/p/${this.article.author.publisher.id}`);
    }
  }
}
