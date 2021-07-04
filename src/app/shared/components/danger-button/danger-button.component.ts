import {
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DomService } from '../../services/dom/dom.service';
import { Theme } from '../../../../types/Theme';
import { DialogComponent, IDialogButton } from '../dialog/dialog.component';

@Component({
  selector: 'shared-danger-button',
  templateUrl: './danger-button.component.html',
  styleUrls: ['./danger-button.component.scss'],
})
export class DangerButtonComponent {
  @Input()
  public theme: Theme = 'light';

  @Input()
  public size: 'auto' | 'fill' = 'auto';

  @Input()
  public icon?: string;

  @Input()
  public message: string = '';

  @Output()
  public confirm = new EventEmitter<void>();

  public dialogButtons: IDialogButton[] = [
    {
      text: 'generic.confirm',
      classes: ['dark', 'danger'],
      onClick: () => this.onConfirm(),
    },
    {
      text: 'generic.cancel',
      classes: ['dark'],
      onClick: () => this.hideDialog(),
    },
  ];

  public dialogRef?: ComponentRef<unknown>;

  constructor(private dom: DomService) {}

  public onConfirm() {
    this.hideDialog();

    this.confirm.emit();
  }

  public showDialog() {
    this.dialogRef = this.dom.appendComponentToBody(
      DialogComponent,
      {
        message: this.message,
        buttons: this.dialogButtons,
      },
      {
        hide: () => this.hideDialog(),
      }
    );
  }

  public hideDialog() {
    if (!this.dialogRef) {
      return;
    }

    this.dom.removeComponentFromBody(this.dialogRef);

    this.dialogRef = undefined;
  }
}
