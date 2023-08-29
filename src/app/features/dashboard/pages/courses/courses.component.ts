import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from './models';
import { selectCoursesArray } from './store/courses.selectors';
import { CoursesActions } from './store/courses.actions';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { NotifierService } from 'src/app/core/services/notifier.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']

})
export class CoursesComponent implements OnInit {
  displayedColumns = ['id', 'name', 'description', 'credits', 'price', 'actions']
  courses$: Observable<Course[]>;
  public isAdmin$: Observable<boolean>

  constructor(private store: Store,
    private matDialog: MatDialog,
    private notifier: NotifierService
  ) {

    this.courses$ = this.store.select(selectCoursesArray);
    this.isAdmin$ = this.store.select(selectIsAdmin)
  }

  onCreateCourse(): void {
    const dialogRef = this.matDialog.open(CourseFormDialogComponent)
    dialogRef.afterClosed().subscribe({
      next: (newCourse) => {
        if (newCourse) {
          this.store.dispatch(CoursesActions.createCourse({ payload: newCourse.getRawValue() }))
        }
      },
    })
  }

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses())
  }


  editCourse(courseToEdit: Course): void {
    const dialogRef = this.matDialog.open(CourseFormDialogComponent, {
      data: courseToEdit,
    });

    dialogRef.afterClosed().subscribe({
      next: (courseUpdated) => {
        if (courseUpdated) {
          this.store.dispatch(CoursesActions.editCourse({ payload: { ...courseUpdated.getRawValue(), id: courseToEdit.id } }))
          this.notifier.showSuccess('Curso editado correctamente');
        }
      },
    })
  }

  deleteCourse(courseToDelete: Course): void {
    if (confirm('Estas seguro que deseas eliminar el curso?')) {
      this.store.dispatch(CoursesActions.deleteCourse({ payload: courseToDelete }))
      this.notifier.showSuccess('Curso eliminado correctamente');
    }
  }

}






