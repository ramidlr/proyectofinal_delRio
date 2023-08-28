import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from './models';
import { selectCoursesArray } from './store/courses.selectors';
import { CoursesActions } from './store/courses.actions';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']

})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;

  constructor(private store: Store,
    // private matDialog: MatDialog,
    // // private courseService: CourseService,
    // private notifier: NotifierService
   ) {
     // this.courseService.loadCourses();
    // this.courses = this.courseService.getCourses();
    this.courses$ = this.store.select(selectCoursesArray);
  }

  displayedColumns = [    'id',
  'name',
  'description',
  'credits',
  'price',
  'actions']

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses())
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

}

