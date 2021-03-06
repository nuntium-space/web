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

  private image: string = "";

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute)
  {}

  public async onImageChange(e: Event)
  {
    const target = e.target as HTMLInputElement;

    if (!target.files)
    {
      return;
    }

    const toBase64 = (file: File): Promise<string> =>
    {
      return new Promise<string>((resolve) =>
      {
        const reader = new FileReader();

        reader.addEventListener("load", () =>
        {
          resolve(reader.result as string);
        });

        reader.readAsDataURL(file);
      });
    }

    const file = target.files.item(0);

    if (file)
    {
      this.image = await toBase64(file);
    }
  }

  public async onSubmit(e: Event)
  {
    e.preventDefault();

    const organization = this.route.snapshot.params.id;

    const response = await this.api.createPublisher({
      name: this.form.get("name")?.value ?? "",
      url: this.form.get("url")?.value ?? "",
      image: this.image,
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
