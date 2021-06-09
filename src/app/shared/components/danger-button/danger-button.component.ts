import { Component, ComponentRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DomService } from '../../services/dom/dom.service';
import { Theme } from '../../types/Theme';
import { DialogComponent, IDialogButton } from '../dialog/dialog.component';

@Component({
  selector: 'shared-danger-button',
  templateUrl: './danger-button.component.html',
  styleUrls: ['./danger-button.component.scss']
})
export class DangerButtonComponent implements OnInit
{
  @Input()
  public theme: Theme = "light";

  @Input()
  public text: string = "";

  @Input()
  public alertText: string = "";

  @Output()
  public confirm = new EventEmitter<void>();

  public dialogButtons: IDialogButton[] = [
    {
      text: this.text,
      classes: [ "dark", "danger" ],
      onClick: () => this.onConfirm(),
    },
    {
      text: this.translate.instant("generic.cancel"),
      classes: [ "dark" ],
      onClick: () => this.hideDialog(),
    },
  ];

  public dialogRef?: ComponentRef<unknown>;

  constructor(private dom: DomService, private translate: TranslateService)
  {}

  public ngOnInit()
  {
    // The actual input value is not set when constructing the component
    this.dialogButtons[0].text = this.text;
  }

  public onConfirm()
  {
    this.hideDialog();

    this.confirm.emit();
  }

  public showDialog()
  {
    this.dialogRef = this.dom.appendComponentToBody(
      DialogComponent,
      {
        message: this.alertText,
        buttons: this.dialogButtons,
      },
      {
        hide: () => this.hideDialog(),
      },
    );
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
