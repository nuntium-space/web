import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, IOrganization } from 'src/app/services/api/api.service';

@Component({
  selector: 'organization-publishers-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreatePublisherComponent
{
  @Input()
  public organization?: IOrganization;

  public form = new FormGroup({
    name: new FormControl(),
    url: new FormControl(),
  });

  constructor(private api: ApiService, private router: Router)
  {}

  public async onSubmit(end: () => void)
  {
    if (!this.organization)
    {
      return;
    }

    const response = await this.api.createPublisher(this.organization.id, {
      name: this.form.get("name")?.value ?? "",
      url: this.form.get("url")?.value ?? "",
    });

    end();

    this.form.get("name")?.setErrors({
      errors: response.errors?.filter(e => e.field === "name")
    });

    this.form.get("url")?.setErrors({
      errors: response.errors?.filter(e => e.field === "url")
    });

    if (response.data)
    {
      this.router.navigateByUrl(`/organization/${this.organization.id}/publishers`);
    }
  }
}
