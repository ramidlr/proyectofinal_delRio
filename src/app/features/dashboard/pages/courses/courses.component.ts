import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoursesActions } from './store/courses.actions';
import { Observable } from 'rxjs';
import { Course } from './models/modelcourses';
import { selectCoursesArray } from './store/courses.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styles: [
  ]
})


export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;

  constructor(private store: Store) {
    this.courses$ = this.store.select(selectCoursesArray);
  }


  displayedColumns = ['id', 'name', 'actions']

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses())
  }

}