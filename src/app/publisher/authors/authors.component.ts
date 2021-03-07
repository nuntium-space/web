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

  constructor(api: ApiService, route: ActivatedRoute)
  {
    api.listAuthorsForPublisher(route.snapshot.params.id).then(response =>
    {
      this.authors = response.data;
    });
  }
}
