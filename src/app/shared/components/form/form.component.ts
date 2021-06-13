import { Component, ComponentRef, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DomService } from '../../services/dom/dom.service';
import { DialogComponent, IDialogButton } from '../dialog/dialog.component';

export type ConfirmEventCallbackOptions =
{
  success: true;
  message?: {
    text?: string,
    /**
     * @default "none"
     */
    type?: "modal" | "message" | "none";
  };
}
|
{
  success: false;
  message?: {
    /**
     * @default "errors.unknown"
     */
    text?: string,
    /**
     * @default "modal"
     */
    type?: "modal" | "message" | "none";
  };
};

@Component({
  selector: 'shared-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent
{
  @Input()
  public submitButtonText?: string;

  @Input()
  public submitButtonSize: "default" | "small" = "default";

  @Output()
  public confirm = new EventEmitter<(options?: ConfirmEventCallbackOptions) => void>();

  public isLoading = false;

  public dialogRef?: ComponentRef<unknown>;

  public dialogButtons: IDialogButton[] = [
    {
      text: "OK",
      classes: [ "dark" ],
      onClick: () => this.hideDialog(),
    },
  ];

  constructor(private dom: DomService, private translate: TranslateService)
  {}

  public async onSubmit(e: Event)
  {
    e.preventDefault();

    this.isLoading = true;

    this.confirm.emit(options =>
    {
      this.isLoading = false;

      options ??= { success: true };
      options.message ??= {};
      options.message.text ??= options.success ? undefined : "errors.unknown";
      options.message.type ??= options.success ? "none" : "modal";

      switch (options.message.type)
      {
        case "message": break;
        case "modal":
        {
          this.dialogRef = this.dom.appendComponentToBody(
            DialogComponent,
            {
              message: this.translate.instant(options.message.text!),
              buttons: this.dialogButtons,
            },
            {
              hide: () => this.hideDialog(),
            },
          );
          
          break;
        }
        case "none": break;
      }
    });
  }

  public hideDialog()
  {
    if (!this.dialogRef)
    {
      return;
    }

    this.dom.removeComponentFromBody(this.dialogRef);

    this.dialogRef = undefined;
  }
}
