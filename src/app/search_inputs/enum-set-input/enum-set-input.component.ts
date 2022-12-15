import {
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { formatEnumName } from 'src/app/utils/HomebrewStringUtils';
import { IEnhancedInput } from '../IEnhancedInput';

@Component({
  selector: 'enum-set-input',
  templateUrl: './enum-set-input.component.html',
  styleUrls: ['./enum-set-input.component.css'],
})
export class EnumSetInputComponent<E extends {}>
  implements IEnhancedInput<E[]>
{
  formatEnumName = formatEnumName;

  @Input()
  name!: string;
  @Input()
  targetEnum: E | undefined;
  @ViewChildren('checkboxes')
  checkboxes: QueryList<ElementRef> | undefined;

  enumKeys: string[] = [];

  ngOnInit() {
    if (this.targetEnum == undefined) {
      throw new Error('targetEnum not defined from parent component.');
    }
    this.enumKeys = Object.keys(this.targetEnum).filter((item) =>
      isNaN(Number(item))
    );
  }

  getValue(): E[] {
    let result: E[] = [];
    if (this.checkboxes == undefined) {
      return result;
    }

    for (let i = 0; i < this.checkboxes.length; i++) {
      let checkbox: HTMLInputElement = this.checkboxes.get(i)!.nativeElement;
      if (checkbox.checked) {
        result.push(i as unknown as E);
      }
    }

    return result;
  }
}
