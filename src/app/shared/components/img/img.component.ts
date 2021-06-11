import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent
{
  @Input()
  public src?: string;

  public hasLoaded = false;

  public onLoad(e: Event)
  {
    this.hasLoaded = true;
  }

  public onError(e: Event)
  {}
}
