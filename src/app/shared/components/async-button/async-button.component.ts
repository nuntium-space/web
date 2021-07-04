import { Component, ComponentRef, EventEmitter, Output } from '@angular/core';
import { DomService } from '../../services/dom/dom.service';
import { IDialogButton, DialogComponent } from '../dialog/dialog.component';

export type ConfirmEventCallbackSuccessOptions = {
  message?: {
    /**
     * @default "none"
     */
    type?: 'modal' | 'message' | 'none';
    text?: string;
  };
};

export type ConfirmEventCallbackFailureOptions = {
  message?: {
    /**
     * @default "modal"
     */
    type?: 'modal' | 'message' | 'none';
    /**
     * @default "errors.unknown"
     */
    text?: string;
  };
};

export type ConfirmEventCallback = [
  (options?: ConfirmEventCallbackSuccessOptions) => void,
  (options?: ConfirmEventCallbackFailureOptions) => void
];

@Component({
  selector: 'shared-async-button',
  templateUrl: './async-button.component.html',
  styleUrls: ['./async-button.component.scss'],
})
export class AsyncButtonComponent {
  @Output()
  public confirm = new EventEmitter<ConfirmEventCallback>();

  public isLoading = false;

  public dialogRef?: ComponentRef<unknown>;

  public dialogButtons: IDialogButton[] = [
    {
      text: 'OK',
      classes: ['dark'],
      onClick: () => this.hideDialog(),
    },
  ];

  constructor(private dom: DomService) {}

  public async onClick() {
    this.isLoading = true;

    this.confirm.emit([
      (options) => {
        this.isLoading = false;

        options ??= {};
        options.message ??= {};
        options.message.type ??= 'none';

        switch (options.message.type) {
          case 'message':
            break;
          case 'modal': {
            this.dialogRef = this.dom.appendComponentToBody(
              DialogComponent,
              {
                message: options.message.text,
                buttons: this.dialogButtons,
              },
              {
                hide: () => this.hideDialog(),
              }
            );

            break;
          }
          case 'none':
            break;
        }
      },
      (options) => {
        this.isLoading = false;

        options ??= {};
        options.message ??= {};
        options.message.type ??= 'modal';
        options.message.text ??= 'errors.unknown';

        switch (options.message.type) {
          case 'message':
            break;
          case 'modal': {
            this.dialogRef = this.dom.appendComponentToBody(
              DialogComponent,
              {
                message: options.message.text,
                buttons: this.dialogButtons,
              },
              {
                hide: () => this.hideDialog(),
              }
            );

            break;
          }
          case 'none':
            break;
        }
      },
    ]);
  }

  public hideDialog() {
    if (!this.dialogRef) {
      return;
    }

    this.dom.removeComponentFromBody(this.dialogRef);

    this.dialogRef = undefined;
  }
}
