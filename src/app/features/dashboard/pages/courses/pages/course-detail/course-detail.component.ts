import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../students/student.service';
import { Student } from '../../../students/models/modelstudents';
import { Store } from '@ngrx/store';
import { CoursesActions } from '../../store/courses.actions';
import { Observable, ObservableLike } from 'rxjs';
import { selectCourseDetailName } from '../../store/courses.selectors';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styles: [
  ]
})
export class CourseDetailComponent implements OnInit {

 displayedColumns: string[] = [
    'id',
    'dni',
    'fullName',
    'email',
    'course',
    'actions',
  ];

  students: Student[] = [];
  courseName$: Observable<string | undefined>

  constructor(private activatedRoute: ActivatedRoute, 
    private studentService: StudentService, 
    private store: Store) {
      this.courseName$ =  this.store.select(selectCourseDetailName)
    }

ngOnInit(): void {
  this.store.dispatch(CoursesActions.loadCourseDetail({ courseId: this.activatedRoute.snapshot.params['id']}))
  this.studentService.getStudentsByCourseId(this.activatedRoute.snapshot.params['id']).subscribe({
    next: (students) => (this.students = students)
  })
}

}
