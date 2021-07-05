import { AbstractControl } from '@angular/forms';

export class Utilities {
  /**
   * This is used because a control can be `null` and with optional
   * chaining if the control is `null` the value that gets sent to the
   * API is also `null`.
   *
   * But that's not the behavior we want. If the control does not exist
   * the value should be `undefined`, and so it is not sent to the API.
   */
  public static getFormControlValue(control: AbstractControl | null): string | undefined {
    return control?.value ?? undefined;
  }
}
