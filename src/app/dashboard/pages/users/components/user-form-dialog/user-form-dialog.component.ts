import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent {


  nameControl = new FormControl(null, [Validators.required, Validators.minLength(3), this.noJuanValidator()]);
surnameControl = new FormControl(null, [Validators.required, Validators.minLength(3)]);
emailControl = new FormControl(null, [Validators.required, Validators.email]); 
passwordControl = new FormControl(null, [Validators.required, Validators.minLength(8)]);

  userForm = new FormGroup({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl,
  })


  noJuanValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
    
      if (control instanceof FormControl) {
      if (typeof control.value === 'string' && 
    control.value?.toLowerCase().includes('juan')) {
        return {
          noJuan: true,
        }
      }
    } 
    
    return null;
  }
  }
  
  /*
    retorno null caso en que el control sea valido, no hay error.
    Abstract Control es que no sabemos si le mandamos FormControl, FormArray o FormG.
*/
  
  constructor(private dialogRef: MatDialogRef<UserFormDialogComponent>){}

  onSubmit(): void {
    // alert(JSON.stringify(this.userForm.value)) 
    this.dialogRef.close(this.userForm.value)
  }
}
