import { Component, Input, OnChanges } from '@angular/core';
import { IAuthor, IPublisher } from 'src/app/services/api/api.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'publisher-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnChanges
{
  @Input()
  public publisher?: IPublisher;

  public authors?: IAuthor[];

  constructor(private api: ApiService)
  {}

  public ngOnChanges()
  {
    if (!this.publisher)
    {
      return;
    }

    this.api
      .listAuthorsForPublisher(this.publisher.id)
      .then(response =>
      {
        this.authors = response.data;
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
