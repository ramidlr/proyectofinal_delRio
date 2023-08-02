import { Component } from '@angular/core';
import { Course } from './models/index';
import { CourseService } from './course.service';
import { Observable } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  public courses: Observable<Course[]>;


  constructor(
    private matDialog: MatDialog,
    private courseService: CourseService,
    private notifier: NotifierService,
  ) {
    this.courseService.loadCourses();
    this.courses = this.courseService.getCourses();
  }




  onCreateCourse(): void {
    const dialogRef = this.matDialog.open(CourseFormDialogComponent);
    dialogRef.afterClosed().subscribe({
      next: (v) => {
        if (v) {
          this.notifier.showSuccess('Curso creado correctamente');
          this.courseService.createCourse({
            id: v.id,
            name: v.name,
            description: v.description,
            credits: v.credits,
            price: v.price,
          });
        }
      },
    });
  }

  deleteCourse(courseToDelete: Course): void {
    if (confirm('Estas seguro que deseas eliminar el curso?'))
      this.notifier.showSuccess('Curso eliminado correctamente');
    this.courseService.deleteCourse(courseToDelete.id);
  }

  editCourse(courseToEdit: Course): void {
    const dialogRef = this.matDialog.open(CourseFormDialogComponent, {
      data: courseToEdit,
    });
    dialogRef.afterClosed().subscribe({
      next: (courseUpdated) => {
        if (courseUpdated) {
          this.courseService.editCourse(courseToEdit.id, courseUpdated);
          this.notifier.showSuccess('Has editado el curso correctamente');
        }
      },
    });
  }
}
