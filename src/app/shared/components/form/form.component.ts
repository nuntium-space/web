import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  public confirm = new EventEmitter<(success?: boolean) => void>();

  public isLoading = false;

  public async onSubmit(e: Event)
  {
    e.preventDefault();

    this.isLoading = true;

    this.confirm.emit((success) =>
    {
      this.isLoading = false;

      if (success)
      {
        console.log("success");
      }
    });
  }
}
