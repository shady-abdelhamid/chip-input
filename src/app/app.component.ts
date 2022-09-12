import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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


  constructor(private formBuilder: FormBuilder) {

  }
}
