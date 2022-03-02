import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';



@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  addForm: FormGroup;
  submitted = false;
  filterdObj: any = null;
  validationErrors : Array<any> = [];

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.addForm = formBuilder.group({
      dt: new FormControl('', [Validators.required, validateDt(data)]),
      status: new FormControl('', [Validators.required]),
      description: new FormControl()
    })
  }


  ngOnInit(): void {
  }

  getValidationErrors() : any {
    const keys = Object.keys(this.addForm.controls);
    let errors = [];
    const errorMap : {[key : string] : any} = {
      'required' : 'Enter all the required fields.',
      'notFound' : 'Enter valid DT'
    }
    this.validationErrors = [];
    keys.filter((key : any) => {
      return this.addForm.controls[key].errors != null;
    }).forEach((key : any) => {
      let errorInfo = this.addForm.controls[key].errors as any;
      let firstKey = Object.keys(errorInfo)[0];
      let message = errorMap[firstKey];
      if(this.validationErrors.indexOf(message) == -1) {
        this.validationErrors.push(message);
      };
    });

  }

  get addFormControl() {
    return this.addForm.controls;
  }

  close() {
    this.dialogRef.close(false);
  }

  addData() {
    this.submitted = true;
    console.log(this.addForm);
    if (!this.addForm.invalid) {
      this.dialogRef.close(this.addForm.value);
    }
    else this.getValidationErrors();
  }

  onBlur() {
      this.filterdObj = this.data.find(({ DvlpmntTypCd }: any) => DvlpmntTypCd == this.addForm.value.dt);
      if (this.filterdObj) {
        this.addForm.controls['description'].setValue(this.filterdObj.DvlpmntTypDscrptn);
      }
      else this.addForm.controls['description'].setValue('');
      
      this.getValidationErrors()
  }

}
 

export function validateDt(data: Array<any>): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value) {
      
      const filterdObj = data.find(({ DvlpmntTypCd }: any) => DvlpmntTypCd == control.value);
      if (!filterdObj) {
        return { notFound: true };
      }
       
    }
    return null;
  }
}
