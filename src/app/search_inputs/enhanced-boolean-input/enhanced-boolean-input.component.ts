import { Component, ViewChild, ElementRef } from '@angular/core';
import { IEnhancedInput } from '../IEnhancedInput';

@Component({
  selector: 'enhanced-boolean-input',
  templateUrl: './enhanced-boolean-input.component.html',
  styleUrls: ['./enhanced-boolean-input.component.css'],
})
export class EnhancedBooleanInputComponent
  implements IEnhancedInput<boolean | null>
{
  @ViewChild('selectStatment')
  private selectField: ElementRef | undefined;

  getValue(): boolean | null {
    if (this.selectField == undefined) {
      return null;
    }
    let input = (this.selectField.nativeElement as HTMLSelectElement)
      .selectedIndex;
    return input == 0 ? null : input == 1;
  }
}
