import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'image-input',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageInputComponent
{
  @Output()
  public change = new EventEmitter<File | null>();

  public imageSrc?: string;

  constructor()
  {}

  public onChange(e: Event)
  {
    this.imageSrc = undefined;

    if (e.target instanceof HTMLInputElement)
    {
      const file = e.target.files?.item(0);

      this.change.emit(file);

      if (file)
      {
        const reader = new FileReader();

        reader.onload = e => this.imageSrc = e.target?.result?.toString();

        reader.readAsDataURL(file);
      }
    }
  }
}
