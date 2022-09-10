import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ChipInputComponent,
      multi: true
    }],
  imports: [BrowserModule]
})
export class ChipInputComponent implements OnInit, ControlValueAccessor {
  values: string[] = [];
  @Input() suggestions!: string[];

  @Output() selection = new EventEmitter<Array<string>>();

  @ViewChild('textbox', { static: true }) textbox!: ElementRef;
  field = '';
  isDisabled = true;

  set value(val: string) {
    this.field = val
    this.onChange(val)
    this.onTouch(val)
  }

  constructor() { }

  onChange: any = () => { }
  onTouch: any = () => { }

  writeValue(value: any) {
    this.value = value
  }
  registerOnChange(fn: any) {
    this.onChange = fn
  }
  registerOnTouched(onTouched: Function) {
    this.onTouch = onTouched;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {
  }

  onEnterKeydown() {
    const { value } = this.textbox.nativeElement;
    this.values.push(value);
    this.selection.emit(this.values);
    this.textbox.nativeElement.value = '';
  }

  /** remove tag when clicked */
  onClick(index: number) {
    this.values.splice(index, 1);
  }

}
