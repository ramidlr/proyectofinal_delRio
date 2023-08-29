import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { InscriptionActions } from '../../store/inscription.actions';
import { Observable } from 'rxjs';
import { Student } from '../../../students/models/modelstudents';
import { selectCourseOptions, selectStudentOptions } from '../../store/inscription.selectors';
import { Course } from '../../../courses/models';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inscription-dialog',
  templateUrl: './inscription-dialog.component.html',
  styles: [
  ]
})
export class InscriptionDialogComponent implements OnInit {

  studentIdControl = new FormControl(null, Validators.required);
  courseIdControl = new FormControl(null, Validators.required);
 
  inscriptionForm = new FormGroup ({
    studentId: this.studentIdControl,
    courseId: this.courseIdControl
  })

  studentOptions$: Observable<Student[]>;
  courseOptions$: Observable<Course[]>;


  constructor(private store: Store,
    private matDialogRef: MatDialogRef<InscriptionDialogComponent>) {
    this.studentOptions$ = this.store.select(selectStudentOptions)
    this.courseOptions$ = this.store.select(selectCourseOptions)

  }


  ngOnInit(): void {
    this.store.dispatch(InscriptionActions.loadStudentOptions()),
    this.store.dispatch(InscriptionActions.loadCourseOptions())
  }

  onSubmit():void {
    if(this.inscriptionForm.invalid) {
      this.inscriptionForm.markAllAsTouched()}
      else {
        this.store.dispatch(InscriptionActions.createInscription({payload: this.inscriptionForm.getRawValue()}))
        this.matDialogRef.close()
      }
    }
  }




