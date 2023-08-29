import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from './models';
import { selectCoursesArray } from './store/courses.selectors';
import { CoursesActions } from './store/courses.actions';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';

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
    // private notifier: NotifierService
  ) {
    // this.courseService.loadCourses();
    // this.courses = this.courseService.getCourses();
    this.courses$ = this.store.select(selectCoursesArray);
    this.isAdmin$ = this.store.select(selectIsAdmin)
  }

  onCreateCourse(): void {
    this.matDialog.open(CourseFormDialogComponent)
  }

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses())
  }


}
// onCreateCourse(): void {
//   const dialogRef = this.matDialog.open(CourseFormDialogComponent);
//   dialogRef.afterClosed().subscribe({
//     next: (v) => {
//       if (v) {
//         this.notifier.showSuccess('Curso creado correctamente');
//         this.courseService.createCourse({
//           id: v.id,
//           name: v.name,
//           description: v.description,
//           credits: v.credits,
//           price: v.price,
//         });
//       }
//     },
//   });
// }

// deleteCourse(courseToDelete: Course): void {
//   if (confirm('Estas seguro que deseas eliminar el curso?'))
//     this.notifier.showSuccess('Curso eliminado correctamente');
//   this.courseService.deleteCourse(courseToDelete.id);
// }

// editCourse(courseToEdit: Course): void {
//   const dialogRef = this.matDialog.open(CourseFormDialogComponent, {
//     data: courseToEdit,
//   });
//   dialogRef.afterClosed().subscribe({
//     next: (courseUpdated) => {
//       if (courseUpdated) {
//         this.courseService.editCourse(courseToEdit.id, courseUpdated);
//         this.notifier.showSuccess('Has editado el curso correctamente');
//       }
//     },
//   });
// }



