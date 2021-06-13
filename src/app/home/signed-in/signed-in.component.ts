import { Component, OnInit } from '@angular/core';
import { IArticle, ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'home-signed-in',
  templateUrl: './signed-in.component.html',
  styleUrls: ['./signed-in.component.scss']
})
export class SignedInComponent implements OnInit
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
      .retrieveUserFeed(this.auth.user.id, 0)
      .then(response =>
      {
        this.articles = response.data;
      });
  }
}
