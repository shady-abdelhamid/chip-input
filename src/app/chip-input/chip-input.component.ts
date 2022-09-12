import { Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  standalone: true,
  selector: 'chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipInputComponent),
      multi: true,
    },],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule]
})
export class ChipInputComponent implements OnInit, ControlValueAccessor, Validator, OnChanges {
  /** element id attribute */
  @Input() id!: string;
  /** element name attribute */
  @Input() name!: string;
  @Input() suggestions!: string[];
  /** to disable the chip input or not */
  @Input() isDisabled = false;
  /** for check if the chip input is required or not  */
  @Input() required = false;

  @Output() changed = new EventEmitter<Array<string>>();

  @ViewChild('textbox', { read: ElementRef, static: true }) textbox!: ElementRef;

  /** to differentiate between to actions 'onblur' or 'whileWriting' */
  public validationMode = '';

  /** for hold the inner value for the chip input */
  private innerValue: Array<string> = [];

  /** pre define actions */
  public validationModeObj = {
    onblur: 'onblur',
    whileWriting: 'whileWriting',
  };

   /** get accessor including */
   get value(): any {
    return this.innerValue;
  }

  /** set accessor including call the onChange callback */
  set value(v: Array<string>) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChange(v);
      this.changed.emit(v);
    }
  }

  constructor() { }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['validateAfterSubmit']) {
      if (changes['validateAfterSubmit'].currentValue === false) {
        this.validationMode = this.validationModeObj.whileWriting;
      } else {
        this.validationMode = this.validationModeObj.onblur;
      }
    }
  }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validateFn(control);
  }

  public validateFn: any = () => { };

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
    this.innerValue.push(value);
    this.changed.emit(this.innerValue);
    this.textbox.nativeElement.value = '';
  }

  /** remove tag when clicked */
  onClick(index: number) {
    this.innerValue.splice(index, 1);
  }

}
