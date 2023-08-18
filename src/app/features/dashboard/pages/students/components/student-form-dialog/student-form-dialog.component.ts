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
import { Student } from '../../models/model';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-student-form-dialog',
  templateUrl: './student-form-dialog.component.html',
  styleUrls: ['./student-form-dialog.component.scss'],
})
export class StudentFormDialogComponent {
  editingStudent?: Student;

  dniControl = new FormControl<string | null>(null, [
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

  courseControl = new FormControl(null, [Validators.required]);
  passwordControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(8),
  ]);

  studentForm = new FormGroup({
    dni: this.dniControl,
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    course: this.courseControl,
    password: this.passwordControl,
  });

  matcher = new ErrorStateMatcher();

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
    private dialogRef: MatDialogRef<StudentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Student
  ) {
    if (this.data) {
      this.editingStudent = this.data;
      this.dniControl.setValue(this.data.dni);
      this.nameControl.setValue(this.data.name);
      this.surnameControl.setValue(this.data.surname);
      this.emailControl.setValue(this.data.email);
      this.courseControl.setValue(this.data.course);
      this.passwordControl.setValue(this.data.password);
    }
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.studentForm.value);
    }
  }
}
