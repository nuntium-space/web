import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ApiService, IBookmark } from '../../services/api/api.service';

@Component({
  selector: 'feeds-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit
{
  public bookmarks?: IBookmark[];

  constructor(private api: ApiService, private auth: AuthService)
  {}

  public ngOnInit()
  {
    if (!this.auth.user)
    {
      return;
    }

    this.api
      .listBookmarks(this.auth.user)
      .then(response =>
      {
        this.bookmarks = response.data;
      });
  }
}
