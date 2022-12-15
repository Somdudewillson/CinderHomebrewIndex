import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { formatEnumName } from 'src/app/utils/HomebrewStringUtils';
import { IEnhancedInput } from '../IEnhancedInput';

@Component({
  selector: 'enum-input',
  templateUrl: './enum-input.component.html',
  styleUrls: ['./enum-input.component.css'],
})
export class EnumInputComponent<E extends {}>
  implements IEnhancedInput<E[] | null>
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

  getValue(): E[] | null {
    if (this.selectField == undefined) {
      return null;
    }

    let selectElement = (this.selectField.nativeElement as HTMLSelectElement);
    let input = Array.from(selectElement.selectedOptions)
      .map(option => option.index)
      .filter(option => option > 0)
      .map(option => ((option - 1) as unknown as E))
    return input.length==0 ? null : input;
  }
}
