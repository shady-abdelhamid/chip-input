import { Component, Input, OnInit } from '@angular/core';
import { __values } from 'tslib';

@Component({
  standalone: true,
  selector: 'chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.scss'],
})
export class ChipInputComponent implements OnInit {
  private chipLabels!: string[];
  @Input() set chips(value: string[]) {
    this.chipLabels = value;
    this.unselectedChips = value;
  };

  unselectedChips!: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
