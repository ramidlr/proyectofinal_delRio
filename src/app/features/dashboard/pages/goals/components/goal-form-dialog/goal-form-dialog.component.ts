import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Goal } from '../../models/model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-goal-form-dialog',
  templateUrl: './goal-form-dialog.component.html',
  styleUrls: ['./goal-form-dialog.component.scss']
})
export class GoalFormDialogComponent {

  editingGoal?: Goal;

  nameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(3),
  ]);
  studentCommentsControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(10),
  ]);

  goalForm = new FormGroup({
    name: this.nameControl,
    studentComments: this.studentCommentsControl,
  });

  matcher = new ErrorStateMatcher();

  constructor(
    private dialogRef: MatDialogRef<GoalFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Goal
  ) {
    if (this.data) {
      this.editingGoal = this.data;
      this.nameControl.setValue(this.data.name);
      this.studentCommentsControl.setValue(this.data.studentComments);
    }
  }

  onSubmit(): void {
    if (this.goalForm.invalid) {
      this.goalForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.goalForm.value);
    }
  }
}


