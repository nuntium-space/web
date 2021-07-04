import { Component, Input } from '@angular/core';
import { Theme } from '../../../../types/Theme';

@Component({
  selector: 'shared-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  @Input()
  public theme: Theme = 'light';
}
