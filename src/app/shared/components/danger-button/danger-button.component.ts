import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IDialogButton } from '../dialog/dialog.component';

@Component({
  selector: 'shared-danger-button',
  templateUrl: './danger-button.component.html',
  styleUrls: ['./danger-button.component.scss']
})
export class DangerButtonComponent implements OnInit
{
  @Input()
  public text: string = "";

  @Input()
  public alertText: string = "";

  @Input()
  public class: string = "";

  @Output()
  public confirm = new EventEmitter<void>();

  public showConfirmDialog = false;

  public dialogButtons: IDialogButton[] = [
    {
      text: this.text,
      classes: [ "dark", "danger" ],
      onClick: () => this.onConfirm(),
    },
    {
      text: this.translate.instant("generic.cancel"),
      classes: [ "dark" ],
      onClick: () => this.showConfirmDialog = false,
    },
  ];

  constructor(private translate: TranslateService)
  {}

  public ngOnInit()
  {
    // The actual input value is not set when constructing the component
    this.dialogButtons[0].text = this.text;
  }

  public onConfirm()
  {
    this.showConfirmDialog = false;

    this.confirm.emit();
  }
}
