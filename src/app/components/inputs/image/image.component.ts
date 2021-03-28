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

  constructor()
  {}

  public onChange(e: Event)
  {
    if (e.target instanceof HTMLInputElement)
    {
      this.change.emit(e.target.files?.item(0));
    }
  }
}
