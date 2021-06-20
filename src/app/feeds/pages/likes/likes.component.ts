import { Component } from '@angular/core';
import { IArticle } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'feeds-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent
{
  public articles?: IArticle[];

  constructor(private api: ApiService, private auth: AuthService)
  {}

  public ngOnInit()
  {
    if (!this.auth.user)
    {
      return;
    }

    this.api
      .listLikes(this.auth.user)
      .then(response =>
      {
        this.articles = response.data;
      });
  }
}
