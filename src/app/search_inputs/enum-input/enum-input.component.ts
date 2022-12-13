import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { formatEnumName } from 'src/app/models/HomebrewEnums';
import { IEnhancedInput } from '../IEnhancedInput';

@Component({
  selector: 'enum-input',
  templateUrl: './enum-input.component.html',
  styleUrls: ['./enum-input.component.css'],
})
export class EnumInputComponent<E extends {}>
  implements IEnhancedInput<E | null>
{
  formatEnumName = formatEnumName;

  @Input()
  targetEnum: E | undefined;
  @ViewChild('enumInput')
  private selectField: ElementRef | undefined;

  enumKeys: string[] = ['——'];

  ngOnInit() {
    if (this.targetEnum == undefined) {
      throw new Error('targetEnum not defined from parent component.');
    }
    Object.keys(this.targetEnum)
      .filter((item) => isNaN(Number(item)))
      .forEach((item) => this.enumKeys.push(item));
  }

  getValue(): E | null {
    if (this.selectField == undefined) {
      return null;
    }
    let input = (this.selectField.nativeElement as HTMLSelectElement)
      .selectedIndex;
    return input == 0 ? null : ((input - 1) as unknown as E);
  }
}
