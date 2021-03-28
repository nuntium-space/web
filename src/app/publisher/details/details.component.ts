import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService, IPublisher } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class PublisherDetailsComponent
{
  public publisher?: IPublisher;

  private image?: File;
  public imageSrc?: string;

  public detailsForm = new FormGroup({
    name: new FormControl(),
    url: new FormControl(),
  });

  public imageForm = new FormGroup({
    image: new FormControl(),
  });

  constructor(private api: ApiService, route: ActivatedRoute)
  {
    route.params.subscribe({
      next: params =>
      {
        api.retrievePublisher(params.id).then(response =>
        {
          if (response.data)
          {
            this.publisher = response.data;
            this.imageSrc = this.publisher.imageUrl ?? undefined;

            this.detailsForm.get("name")?.setValue(this.publisher.name);
            this.detailsForm.get("url")?.setValue(this.publisher.url);
          }
        });
      },
    });
  }

  public async onDetailsFormSubmit(e: Event)
  {
    e.preventDefault();

    if (!this.publisher)
    {
      return;
    }

    const response = await this.api.updatePublisher(this.publisher.id, {
      name: this.detailsForm.get("name")?.value,
      url: this.detailsForm.get("url")?.value,
    });

    this.detailsForm.get("name")?.setErrors({
      errors: response.errors?.filter(e => e.field === "name")
    });

    this.detailsForm.get("url")?.setErrors({
      errors: response.errors?.filter(e => e.field === "url")
    });
  }

  public onImageChange(e: Event)
  {
    this.image = this.imageSrc = undefined;

    if (e.target instanceof HTMLInputElement)
    {
      const file = e.target.files?.item(0);

      if (file)
      {
        this.image = file;

        const reader = new FileReader();

        reader.onload = e => this.imageSrc = e.target?.result?.toString();

        reader.readAsDataURL(file);
      }
    }
  }

  public async onImageFormSubmit(e: Event)
  {
    e.preventDefault();

    if (!this.publisher || !this.image)
    {
      return;
    }

    const response = await this.api.updatePublisherImage(this.publisher.id, {
      image: this.image,
    });

    this.imageForm.get("image")?.setErrors({
      errors: response.errors?.filter(e => e.field === "image")
    });
  }
}
