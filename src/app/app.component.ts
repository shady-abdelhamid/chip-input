import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChipInputComponent } from './chip-input/chip-input.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public form: FormGroup = this.formBuilder.group({
    selection: [['TypeScript', 'Javascript']],
  });

  title = 'chip-input';
  suggestionList = [
    'Typescript',
    'Javascript',
    'C#',
    'Objective C',
    'C++',
    'Python',
    'Java',
    'Perl'
  ];
  
  value!: Array<string>;

  constructor(private formBuilder: FormBuilder) {

  }

  updateValue(chips: Array<string>) {
    this.value = chips;
  }
}
