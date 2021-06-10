import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService, IPublisher } from 'src/app/services/api/api.service';

@Component({
  selector: 'publisher-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class PublisherDetailsComponent implements OnChanges
{
  @Input()
  public publisher?: IPublisher;

  @Output()
  public update = new EventEmitter<IPublisher>();

  private image?: File;

  public detailsForm = new FormGroup({
    name: new FormControl(),
    url: new FormControl(),
  });

  public imageForm = new FormGroup({
    image: new FormControl(),
  });

  constructor(private api: ApiService)
  {}

  public ngOnChanges()
  {
    if (!this.publisher)
    {
      return;
    }

    this.api
      .retrievePublisher(this.publisher.id)
      .then(response =>
      {
        if (response.data)
        {
          this.publisher = response.data;

          this.detailsForm.get("name")?.setValue(this.publisher.name);
          this.detailsForm.get("url")?.setValue(this.publisher.url);
        }
      });
  }

  public async onDetailsFormSubmit(end: () => void)
  {
    if (!this.publisher)
    {
      return;
    }

    const response = await this.api.updatePublisher(this.publisher.id, {
      name: this.detailsForm.get("name")?.value,
      url: this.detailsForm.get("url")?.value,
    });

    end();

    this.detailsForm.get("name")?.setErrors({
      errors: response.errors?.filter(e => e.field === "name")
    });

    this.detailsForm.get("url")?.setErrors({
      errors: response.errors?.filter(e => e.field === "url")
    });

    if (response.success)
    {
      this.update.emit(response.data);
    }
  }

  public onImageChange(e: Event)
  {
    this.image = undefined;

    if (e.target instanceof HTMLInputElement)
    {
      const file = e.target.files?.item(0);

      this.image = file ?? undefined;
    }
  }

  public async onImageFormSubmit(end: () => void)
  {
    if (!this.publisher || !this.image)
    {
      return;
    }

    const response = await this.api.updatePublisherImage(this.publisher.id, {
      image: this.image,
    });

    end();

    this.imageForm.get("image")?.setErrors({
      errors: response.errors?.filter(e => e.field === "image")
    });

    if (response.success)
    {
      this.update.emit(response.data);
    }
  }
}
