import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../students/student.service';
import { Student } from '../../../students/models/modelstudents';

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

  constructor(private activatedRoute: ActivatedRoute, 
    private studentService: StudentService) {}

ngOnInit(): void {
  this.studentService.getStudentsByCourseId(this.activatedRoute.snapshot.params['id']).subscribe({
    next: (students) => (this.students = students)
  })
}

}
