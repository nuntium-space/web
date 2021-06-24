import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IArticleDraft } from 'src/app/pages/draft/services/api/api.service';
import { IAuthor } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent implements OnInit
{
  public author?: IAuthor;

  public drafts?: IArticleDraft[];

  constructor(public auth: AuthService, private api: ApiService, private route: ActivatedRoute)
  {}

  public ngOnInit()
  {
    this.route.params.subscribe({
      next: params =>
      {
        if (!this.auth.user)
        {
          return;
        }

        this.api
          .retrieveAuthorForUserAndPublisher(this.auth.user.id, params.id)
          .then(response =>
          {
            this.author = response.data?.[0];

            return this.author;
          })
          .then(author =>
          {
            if (!author)
            {
              return;
            }

            return this.api.retrieveDraftsForAuthor(author.id)
          })
          .then(response =>
          {
            this.drafts = response?.data;
          });
      },
    });
  }
}
