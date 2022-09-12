import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { __values } from 'tslib';

@Component({
  standalone: true,
  selector: 'chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.scss'],
  imports: [BrowserModule]
})
export class ChipInputComponent implements OnInit {
  values: string[] = [];
  @Input() suggestions!: string[];


  @ViewChild('textbox', { static: true }) textbox!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onEnterKeydown() {
    const { value } = this.textbox.nativeElement;
    this.values.push(value);
    this.textbox.nativeElement.value = '';
  }

  /** remove tag when clicked */
  onClick(index: number) {
    this.values.splice(index, 1);
  }

}
