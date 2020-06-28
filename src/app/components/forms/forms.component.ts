import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  examplForm: FormGroup;
  formError: {firstName: {error: boolean, msg: string}, lastName: {error: boolean, msg: string}} = {
    firstName: {
      error: false,
      msg: ''
    },
    lastName: {
      error: false,
      msg: ''
    }
  };
  @Input() componentType = 'create';
  @Input() inputObj: any;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.examplForm = this.formBuilder.group({
      firstName: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('')])),
      lastName: this.formBuilder.control('', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])),
    });
  }
  resetFormError() {
    this.formError.firstName.error = false;
    this.formError.lastName.error = false;
  }
  validateForm() {
    this.resetFormError();
    if (this.examplForm.controls.firstName.errors) {
      this.formError.firstName.error = true;
      this.formError.firstName.msg = 'Wrong';
    }
    if (this.examplForm.controls.lastName.errors) {
      this.formError.lastName.error = true;
      if (this.examplForm.value.lastName === '') {
        this.formError.lastName.msg = 'Cannot be empty';
      } else {
        this.formError.lastName.msg = 'Blah blah cannot have alphabest only numbers !!!';
      }
    }
  }
  submitForm() {
    console.log('the form was submitted!!! \n', this.examplForm.value);
    this.validateForm();
  }
}
