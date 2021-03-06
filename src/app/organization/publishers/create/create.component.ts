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
  public form = new FormGroup({
    name: new FormControl(),
    url: new FormControl(),
    image: new FormControl(),
  });

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute)
  {}

  public async onSubmit(e: Event)
  {
    e.preventDefault();

    const organization = this.route.snapshot.params.id;

    const response = await this.api.createPublisher({
      name: this.form.get("name")?.value ?? "",
      url: this.form.get("url")?.value ?? "",
      image: this.form.get("image")?.value ?? "",
      organization,
    });

    this.form.get("name")?.setErrors({
      errors: response.errors?.filter(e => e.startsWith(`"name"`))
    });

    this.form.get("url")?.setErrors({
      errors: response.errors?.filter(e => e.startsWith(`"url"`))
    });

    this.form.get("image")?.setErrors({
      errors: response.errors?.filter(e => e.startsWith(`"image"`))
    });

    if (response.data)
    {
      this.router.navigateByUrl(`/organization/${organization}/publishers`);
    }
  }
}
