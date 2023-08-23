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
import { User } from '../../models/modelusers';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss'],
})
export class UserFormDialogComponent {
  editingUser?: User;

  dniControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(7),
  ]);
  nameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(3)
  ]);
  surnameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(3),
  ]);
  emailControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.email,
  ]);

  courseControl = new FormControl(null, [Validators.required]);
  passwordControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(8),
  ]);

  roleControl = new FormControl<string | null>(null, Validators.required)

  userForm = new FormGroup({
    dni: this.dniControl,
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    course: this.courseControl,
    password: this.passwordControl,
    role: this.roleControl,
  });

  matcher = new ErrorStateMatcher();

  constructor(
    private dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: User
  ) {
    if (this.data) {
      this.editingUser = this.data;
      this.dniControl.setValue(this.data.dni);
      this.nameControl.setValue(this.data.name);
      this.surnameControl.setValue(this.data.surname);
      this.emailControl.setValue(this.data.email);
      this.courseControl.setValue(this.data.course);
      this.passwordControl.setValue(this.data.password);
      this.roleControl.setValue(this.data.role);
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      const payload: any = {
        ...this.userForm.value
      }
      if (this.editingUser) { 
        payload['token'] = this.editingUser.token
      }

      this.dialogRef.close(payload);
    }
  }
}
