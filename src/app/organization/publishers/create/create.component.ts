import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreatePublisherComponent
{
  private organizationId?: string;

  public form = new FormGroup({
    name: new FormControl(),
    url: new FormControl(),
  });

  constructor(private api: ApiService, private router: Router, route: ActivatedRoute)
  {
    route.params.subscribe({
      next: params =>
      {
        this.organizationId = params.id;
      },
    });
  }

  public async onSubmit(e: Event)
  {
    e.preventDefault();

    if (!this.organizationId)
    {
      return;
    }

    const response = await this.api.createPublisher(this.organizationId, {
      name: this.form.get("name")?.value ?? "",
      url: this.form.get("url")?.value ?? "",
    });

    this.form.get("name")?.setErrors({
      errors: response.errors?.filter(e => e.field === "name")
    });

    this.form.get("url")?.setErrors({
      errors: response.errors?.filter(e => e.field === "url")
    });

    if (response.data)
    {
      this.router.navigateByUrl(`/organization/${this.organizationId}/publishers`);
    }
  }
}
