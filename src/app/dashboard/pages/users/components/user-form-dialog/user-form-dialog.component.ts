import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/model';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss'],
})
export class UserFormDialogComponent {
  
  idControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(7),
  ]);
  nameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(3),
    this.noJuanValidator(),
  ]);
  surnameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(3),
  ]);
  emailControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.email,
  ]);
  passwordControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(8),
  ]);

  userForm = new FormGroup({
    id: this.idControl,
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl,
  });

  noJuanValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control instanceof FormControl) {
        if (
          typeof control.value === 'string' &&
          control.value?.toLowerCase().includes('juan')
        ) {
          return {
            noJuan: true,
          };
        }
      }

      return null;
    };
  }

  constructor(
    private dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: User
  ) {
    if (this.data) {
      this.idControl.setValue(this.data.id);
      this.nameControl.setValue(this.data.name);
      this.surnameControl.setValue(this.data.surname);
      this.emailControl.setValue(this.data.email);
      this.passwordControl.setValue(this.data.password);
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
