import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'danger-button',
  templateUrl: './danger-button.component.html',
  styleUrls: ['./danger-button.component.scss']
})
export class DangerButtonComponent
{
  @Input()
  public text: string;

  @Input()
  public alertText: string;

  @Output()
  public confirm = new EventEmitter<void>();

  constructor()
  {
    this.text ??= "";
    this.alertText ??= "";
  }

  public onClick()
  {
    if (confirm(this.alertText))
    {
      this.confirm.emit();
    }
  }
}
