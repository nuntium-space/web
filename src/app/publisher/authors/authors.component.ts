import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IAuthor } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent
{
  public authors?: IAuthor[];

  constructor(private api: ApiService, route: ActivatedRoute)
  {
    route.params.subscribe({
      next: params =>
      {
        api.listAuthorsForPublisher(params.id).then(response =>
        {
          this.authors = response.data;
        });
      },
    });
  }

  public async removeAuthor(author: IAuthor)
  {
    if (!this.authors)
    {
      return;
    }

    await this.api.deleteAuthor(author.id);

    this.authors = this.authors.filter(a => a.id !== author.id);
  }
}
