import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  @Input()
  public message: string = '';

  @Input()
  public buttons: IDialogButton[] = [];

  @Output()
  public hide = new EventEmitter<void>();

  public onDialogContainerClick(e: Event) {
    const target = e.target as HTMLElement;

    if (target.className === 'dialog-container') {
      this.hide.emit();
    }
  }
}

export interface IDialogButton {
  text: string;
  classes: string[];
  onClick: () => void;
}
