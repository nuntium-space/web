import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'write-new-article',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class WriteNewArticleComponent
{
  public form = new FormGroup({
    title: new FormControl(),
    content: new FormControl(),
  });

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute)
  {}

  public async onSubmit(e: Event)
  {
    e.preventDefault();

    const response = await this.api.createArticle("TODO", {
      title: this.form.get("title")?.value ?? "",
      content: this.form.get("content")?.value ?? "",
    });

    this.form.get("title")?.setErrors({
      errors: response.errors?.filter(e => e.startsWith(`"title"`))
    });

    this.form.get("content")?.setErrors({
      errors: response.errors?.filter(e => e.startsWith(`"content"`))
    });

    if (response.data)
    {
      this.router.navigate([ ".." ], {
        relativeTo: this.route,
      });
    }
  }
}
