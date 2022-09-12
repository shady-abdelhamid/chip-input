import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.scss'],
  imports: [BrowserModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ChipInputComponent),
    },
  ],
})
export class ChipInputComponent implements OnInit, ControlValueAccessor {
  chips: Array<string> = [];
  @Input() suggestions!: string[];
  @ViewChild('textbox', { static: true }) textbox!: ElementRef;

  // onChange placeholder
  onChange = (chips: Array<string>) => {};

  // onTouched placeholder
  onTouched = () => {};

  touched = false;

  disabled = false;

  constructor() {}

  writeValue(chips: Array<string>) {
    this.chips = chips;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {}

  onEnterKeydown() {
    this.markAsTouched();
    const { value } = this.textbox.nativeElement;
    this.chips = [...this.chips, value];
    console.log(this.chips);

    this.onChange(this.chips);
    this.textbox.nativeElement.value = '';
  }

  /** remove tag when clicked */
  onClick(index: number) {
    console.log(index);
    
    this.markAsTouched();
    this.chips.splice(index, 1);
    console.log(this.chips);
    
    this.onChange(this.chips);
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
