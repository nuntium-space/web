import { Component, ComponentRef, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DomService } from '../../services/dom/dom.service';
import { ConfirmEventCallback } from '../async-button/async-button.component';
import { DialogComponent, IDialogButton } from '../dialog/dialog.component';

@Component({
  selector: 'shared-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent
{
  @Input()
  public submitButtonText?: string;

  @Output()
  public confirm = new EventEmitter<ConfirmEventCallback>();

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

    this.confirm.emit([
      options =>
      {
        this.isLoading = false;

        options ??= {};
        options.message ??= {};
        options.message.type ??= "none";

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
      },
      options =>
      {
        this.isLoading = false;

        options ??= {};
        options.message ??= {};
        options.message.type ??= "modal";
        options.message.text ??= "errors.unknown";

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
      },
    ]);
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
