import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, IAuthor } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'write-new-article',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class WriteNewArticleComponent
{
  private author?: IAuthor;

  public form = new FormGroup({
    title: new FormControl(),
    content: new FormControl(),
  });

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, auth: AuthService)
  {
    if (!auth.user)
    {
      return;
    }

    api.listAuthorsForUser(auth.user.id).then(response =>
    {
      if (response.data)
      {
        this.author = response.data.find(author => author.publisher.id === route.snapshot.params.id);
      }
    });
  }

  public async onSubmit(end: () => void)
  {
    if (!this.author)
    {
      return;
    }

    const response = await this.api.createArticle(this.author.id, {
      title: this.form.get("title")?.value ?? "",
      content: this.form.get("content")?.value ?? "",
    });

    end();

    this.form.get("title")?.setErrors({
      errors: response.errors?.filter(e => e.field === "title")
    });

    this.form.get("content")?.setErrors({
      errors: response.errors?.filter(e => e.field === "content")
    });

    if (response.data)
    {
      this.router.navigate([ ".." ], {
        relativeTo: this.route,
      });
    }
  }
}
