import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoursesActions } from './store/courses.actions';
import { Observable } from 'rxjs';
import { Course } from './models/modelcourses';
import { selectCoursesArray } from './store/courses.selectors';
import { selectAuthUserAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styles: [
  ]
})


export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  public isAdmin$: Observable<boolean>;


  constructor(private store: Store) {
    this.isAdmin$ = this.store.select(selectAuthUserAdmin)
    this.courses$ = this.store.select(selectCoursesArray);
  }


  displayedColumns = ['id', 'name', 'actions']

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses())
  }

}