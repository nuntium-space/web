import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, IOrganization } from 'src/app/services/api/api.service';

@Component({
  selector: 'organization-bundles-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateBundleComponent
{
  @Input()
  public organization?: IOrganization;

  public form = new FormGroup({
    name: new FormControl(),
  });

  constructor(private api: ApiService, private router: Router)
  {}

  public async onSubmit(end: () => void)
  {
    if (!this.organization)
    {
      return;
    }

    const response = await this.api.createBundle(this.organization.id, {
      name: this.form.get("name")?.value ?? "",
    });

    end();

    this.form.get("name")?.setErrors({
      errors: response.errors?.filter(e => e.field === "name")
    });

    if (response.data)
    {
      this.router.navigateByUrl(`/organization/${this.organization.id}/bundles`);
    }
  }
}
