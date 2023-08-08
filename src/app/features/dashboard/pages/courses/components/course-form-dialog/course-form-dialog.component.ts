import { Component, Inject } from '@angular/core';
import { Course } from '../../models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-course-form-dialog',
  templateUrl: './course-form-dialog.component.html',
  styleUrls: ['./course-form-dialog.component.scss']
})
export class CourseFormDialogComponent {
  editingCourse?: Course;

  nameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(3),
  ]);
  descriptionControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(10),
  ]);
  creditsControl = new FormControl<number | null>(null, [
    Validators.required,
  ]);
  priceControl = new FormControl<number | null>(null,
    Validators.required);


  courseForm = new FormGroup({
    name: this.nameControl,
    description: this.descriptionControl,
    credits: this.creditsControl,
    price: this.priceControl,
  });

  matcher = new ErrorStateMatcher();



  constructor(
    private dialogRef: MatDialogRef<CourseFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Course
  ) {
    if (this.data) {
      this.editingCourse = this.data;
      this.nameControl.setValue(this.data.name);
      this.descriptionControl.setValue(this.data.description);
      this.creditsControl.setValue(this.data.credits);
      this.priceControl.setValue(this.data.price);
    }
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.courseForm.value);
    }
  }
}

