import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'create-bundle',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateBundleComponent
{
  private organizationId?: string;

  public form = new FormGroup({
    name: new FormControl(),
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

    const response = await this.api.createBundle(this.organizationId, {
      name: this.form.get("name")?.value ?? "",
    });

    this.form.get("name")?.setErrors({
      errors: response.errors?.filter(e => e.field === "name")
    });

    if (response.data)
    {
      this.router.navigateByUrl(`/organization/${this.organizationId}/bundles`);
    }
  }
}
