import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'danger-button',
  templateUrl: './danger-button.component.html',
  styleUrls: ['./danger-button.component.scss']
})
export class DangerButtonComponent
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

  constructor()
  {}

  public onConfirm()
  {
    this.confirm.emit();
  }
}
