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
          this.publisher = response.data;

          this.detailsForm.get("name")?.setValue(this.publisher?.name);
          this.detailsForm.get("url")?.setValue(this.publisher?.url);
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

  public onImageChange(file: File | null)
  {
    this.imageForm.get("image")?.setValue(file);
  }

  public async onImageFormSubmit(e: Event)
  {
    e.preventDefault();

    if (!this.publisher)
    {
      return;
    }

    /*
    const response = await this.api.updatePublisherImage(this.publisher.id, {
      image: this.imageForm.get("image")?.value,
    });

    this.imageForm.get("image")?.setErrors({
      errors: response.errors?.filter(e => e.field === "image")
    });
    */
  }
}
