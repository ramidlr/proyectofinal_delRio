import { Component, OnInit } from '@angular/core';
import { Course } from './models/index';
import { CourseService } from './course.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  public dataSource: Course[] = [];
  public data$: Observable<Course[]>
  public displayedColumns = ['id', 'name', 'description', 'credits', 'price']

  constructor(private courseService: CourseService) {
    this.data$ = this.courseService.getCourses();
  }


  ngOnInit(): void {
    this.courseService.loadCourses();
    this.courseService.getCourses().subscribe({
      next: (data) => console.log('data: ', data),
    })
  }

  onCreate(): void {
    this.courseService.create();
  }



}
