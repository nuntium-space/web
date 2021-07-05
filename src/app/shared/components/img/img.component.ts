import { Component, Input } from '@angular/core';
import { Theme } from '../../../../types/Theme';

@Component({
  selector: 'shared-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent {
  @Input()
  public src?: string;

  @Input()
  public theme: Theme = 'light';

  public hasLoaded = false;

  public onLoad(e: Event) {
    this.hasLoaded = true;
  }

  public onError(e: Event) {
    // TODO
  }
}
