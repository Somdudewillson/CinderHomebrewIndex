import {
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { formatEnumName } from 'src/app/models/HomebrewEnums';

@Component({
  selector: 'enum-set-input',
  templateUrl: './enum-set-input.component.html',
  styleUrls: ['./enum-set-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: EnumSetInputComponent,
    },
  ],
})
export class EnumSetInputComponent implements ControlValueAccessor {
  @Input()
  name!: string;
  @Input()
  sourceEnum!: EnumObject;
  @ViewChildren('checkboxes')
  checkboxes!: QueryList<ElementRef>;

  enumKeys: string[] = [];

  formatEnumName = formatEnumName;
  onChange = (enumSet: number[]) => {};
  onTouched = () => {};
  touched = false;

  ngOnInit() {
    this.enumKeys = Object.keys(this.sourceEnum).filter((item) =>
      isNaN(Number(item))
    );
  }

  ngAfterViewInit() {
    this.checkboxes.changes.subscribe((_) => {
      this.markAsTouched();
      this.onChange(this.readValue());
    });
  }

  readValue(): number[] {
    let result: number[] = [];

    for (let i = 0; i < this.checkboxes.length; i++) {
      let checkbox: HTMLInputElement = this.checkboxes.get(i)!.nativeElement;
      if (checkbox.checked) {
        result.push(i);
      }
    }

    return result;
  }
  writeValue(enumSet: number[]): void {
    for (const checkboxRef of this.checkboxes) {
      checkboxRef.nativeElement.checked = false;
    }
    for (const enumID of enumSet) {
      let checkbox: HTMLInputElement =
        this.checkboxes.get(enumID)!.nativeElement;
      checkbox.checked = true;
    }
  }
  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }
  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    for (const checkboxRef of this.checkboxes) {
      (checkboxRef.nativeElement as HTMLInputElement).disabled = isDisabled;
    }
  }
}

type EnumObject = { [key: string]: number | string };
